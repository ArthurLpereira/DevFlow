import { useState, useEffect, useCallback } from "react";
import type { Categoria, Coluna, Tarefa, TarefasStatus, TarefaEditData, TarefasPrioridade } from "./types";
import ItemBoard from "./components/Board";
import ConfirmModal from "./components/ConfirmModal";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";
import CategoriaManager from "./components/CategoriaManager";
import api from "./services/api";

const COLUNAS_CONFIG: { id: number; titulo: string; status: TarefasStatus }[] = [
  { id: 1, titulo: "A Fazer", status: "a_fazer" },
  { id: 2, titulo: "Em Andamento", status: "em_andamento" },
  { id: 3, titulo: "Fazendo", status: "fazendo" },
  { id: 4, titulo: "Pronto", status: "pronto" },
];

function App() {
  const [colunas, setColunas] = useState<Coluna[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tarefaParaDeletar, setTarefaParaDeletar] = useState<number | null>(null);
  const [tarefaParaEditar, setTarefaParaEditar] = useState<TarefaEditData | null>(null);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalCategoriasAberto, setModalCategoriasAberto] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca tarefas e categorias em paralelo
        const [resTarefas, resCategorias] = await Promise.all([
          api.get<{ data: Tarefa[] }>("/tarefas"),
          api.get<{ data: Categoria[] }>("/categorias"),
        ]);

        const tarefas = resTarefas.data.data;
        const cats = resCategorias.data.data;

        const colunasFormatadas: Coluna[] = COLUNAS_CONFIG.map((col) => ({
          id: col.id,
          titulo: col.titulo,
          status: col.status,
          tarefas: tarefas.filter((tarefa) => tarefa.status === col.status),
        }));

        setColunas(colunasFormatadas);
        setCategorias(cats);
      } catch (erro) {
        setError("Não foi possível carregar os dados.");
        console.error("Erro ao carregar dados:", erro);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const atualizarStatus = useCallback(async (id: number, novoStatus: TarefasStatus) => {
    try {
      await api.patch(`/tarefas/${id}`, { status: novoStatus });

      setColunas(prev => {
        let tarefaMovida: Tarefa | undefined;

        const colunasAtualizadas = prev.map(col => ({
          ...col,
          tarefas: col.tarefas.filter(t => {
            if (t.id === id) {
              tarefaMovida = { ...t, status: novoStatus };
              return false;
            }
            return true;
          }),
        }));

        return colunasAtualizadas.map(col => {
          if (col.status === novoStatus && tarefaMovida) {
            return { ...col, tarefas: [...col.tarefas, tarefaMovida] };
          }
          return col;
        });
      });
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
    }
  }, []);

  const pedirConfirmacaoDelete = useCallback((id: number) => {
    setTarefaParaDeletar(id);
  }, []);

  const confirmarDelete = useCallback(async () => {
    if (tarefaParaDeletar === null) return;
    try {
      await api.delete(`/tarefas/${tarefaParaDeletar}`);
      setColunas(prev => prev.map(col => ({
        ...col,
        tarefas: col.tarefas.filter(t => t.id !== tarefaParaDeletar),
      })));
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
    } finally {
      setTarefaParaDeletar(null);
    }
  }, [tarefaParaDeletar]);

  const abrirEdicao = useCallback((dados: TarefaEditData) => {
    setTarefaParaEditar(dados);
  }, []);

  const salvarEdicao = useCallback(async (
    id: number,
    dados: { nome: string; descricao?: string; prioridade: TarefasPrioridade; categoriaId: number | null }
  ) => {
    try {
      await api.patch(`/tarefas/${id}`, dados);

      // Busca o objeto da categoria atualizada para manter o campo `categoria` correto no estado
      const categoriaAtualizada = dados.categoriaId
        ? categorias.find(c => c.id === dados.categoriaId) ?? null
        : null;

      setColunas(prev => prev.map(col => ({
        ...col,
        tarefas: col.tarefas.map(t =>
          t.id === id ? { ...t, ...dados, categoria: categoriaAtualizada ?? undefined } : t
        ),
      })));
    } catch (erro) {
      console.error("Erro ao editar tarefa:", erro);
    } finally {
      setTarefaParaEditar(null);
    }
  }, [categorias]);

  // Callback chamado pelo CategoriaManager quando a lista de categorias muda
  const handleCategoriasChange = useCallback((novasCategorias: Categoria[]) => {
    setCategorias(novasCategorias);

    // Atualiza as tarefas que referenciam categorias que podem ter sido renomeadas ou removidas
    setColunas(prev => prev.map(col => ({
      ...col,
      tarefas: col.tarefas.map(t => {
        if (!t.categoriaId) return t;
        const catAtualizada = novasCategorias.find(c => c.id === t.categoriaId);
        if (!catAtualizada) {
          // Categoria foi deletada
          return { ...t, categoriaId: null, categoria: undefined };
        }
        // Categoria pode ter sido renomeada
        return { ...t, categoria: catAtualizada };
      }),
    })));
  }, []);

  const criarTarefa = useCallback(async (dados: {
    nome: string;
    descricao?: string;
    prioridade: TarefasPrioridade;
    status: TarefasStatus;
    categoriaId: number | null;
  }) => {
    try {
      const response = await api.post<{ data: Tarefa }>("/tarefas", dados);
      const novaTarefa = response.data.data;

      setColunas(prev => prev.map(col => {
        if (col.status === dados.status) {
          return { ...col, tarefas: [...col.tarefas, novaTarefa] };
        }
        return col;
      }));
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    } finally {
      setModalCriarAberto(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">

      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-[#30363d] bg-[#161b22] flex-shrink-0">
        <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">DF</span>
        </div>
        <h1 className="text-[#e6edf3] font-semibold text-base tracking-tight m-0">DevFlow</h1>
        <span className="text-[#484f58] text-sm">/ Kanban</span>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setModalCategoriasAberto(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#30363d] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Categorias
          </button>
          <button
            onClick={() => setModalCriarAberto(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova tarefa
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center flex-1 gap-3 text-[#8b949e] text-sm">
          <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          Carregando tarefas...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center flex-1 text-red-400 text-sm">
          {error}
        </div>
      ) : (
        <ItemBoard
          colunas={colunas}
          onStatusChange={atualizarStatus}
          onDelete={pedirConfirmacaoDelete}
          onEdit={abrirEdicao}
        />
      )}

      {tarefaParaDeletar !== null && (
        <ConfirmModal
          onConfirm={confirmarDelete}
          onCancel={() => setTarefaParaDeletar(null)}
        />
      )}

      {tarefaParaEditar !== null && (
        <EditModal
          {...tarefaParaEditar}
          categorias={categorias}
          onSave={salvarEdicao}
          onCancel={() => setTarefaParaEditar(null)}
        />
      )}

      {modalCriarAberto && (
        <CreateModal
          categorias={categorias}
          onSave={criarTarefa}
          onCancel={() => setModalCriarAberto(false)}
        />
      )}

      {modalCategoriasAberto && (
        <CategoriaManager
          categorias={categorias}
          onCategoriasChange={handleCategoriasChange}
          onClose={() => setModalCategoriasAberto(false)}
        />
      )}

    </div>
  );
}

export default App;
