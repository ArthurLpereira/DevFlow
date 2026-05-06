import { useState } from "react";
import type { Categoria } from "../../types";
import { getCategoryColor } from "../../utils/categoryColors";
import api from "../../services/api";

interface CategoriaManagerProps {
    categorias: Categoria[];
    onCategoriasChange: (categorias: Categoria[]) => void;
    onClose: () => void;
}

const CategoriaManager = ({ categorias, onCategoriasChange, onClose }: CategoriaManagerProps) => {
    // Estado para criar nova categoria
    const [novoNome, setNovoNome] = useState("");
    const [criando, setCriando] = useState(false);

    // Estado para edição inline
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editandoNome, setEditandoNome] = useState("");

    // Estado para confirmação de exclusão
    const [deletandoId, setDeletandoId] = useState<number | null>(null);

    // Estado de erro
    const [erro, setErro] = useState<string | null>(null);

    // ── Criar categoria ──
    async function handleCriar(e: React.FormEvent) {
        e.preventDefault();
        if (!novoNome.trim() || criando) return;

        setCriando(true);
        setErro(null);

        try {
            const response = await api.post<{ data: Categoria }>("/categorias", {
                nome: novoNome.trim(),
            });
            const novaCategoria = response.data.data;
            onCategoriasChange([...categorias, novaCategoria]);
            setNovoNome("");
        } catch (error: any) {
            if (error.response?.status === 409) {
                setErro("Já existe uma categoria com esse nome.");
            } else {
                setErro("Erro ao criar categoria.");
            }
        } finally {
            setCriando(false);
        }
    }

    // ── Salvar edição ──
    async function handleSalvarEdicao() {
        if (editandoId === null || !editandoNome.trim()) return;

        setErro(null);

        try {
            const response = await api.patch<{ data: Categoria }>(`/categorias/${editandoId}`, {
                nome: editandoNome.trim(),
            });
            const categoriaAtualizada = response.data.data;
            onCategoriasChange(
                categorias.map((c) => (c.id === editandoId ? categoriaAtualizada : c))
            );
            setEditandoId(null);
            setEditandoNome("");
        } catch (error: any) {
            if (error.response?.status === 409) {
                setErro("Já existe uma categoria com esse nome.");
            } else {
                setErro("Erro ao editar categoria.");
            }
        }
    }

    // ── Confirmar exclusão ──
    async function handleConfirmarDelete() {
        if (deletandoId === null) return;

        setErro(null);

        try {
            await api.delete(`/categorias/${deletandoId}`);
            onCategoriasChange(categorias.filter((c) => c.id !== deletandoId));
        } catch {
            setErro("Erro ao excluir categoria.");
        } finally {
            setDeletandoId(null);
        }
    }

    // ── Iniciar edição ──
    function iniciarEdicao(cat: Categoria) {
        setEditandoId(cat.id);
        setEditandoNome(cat.nome);
        setErro(null);
    }

    // ── Cancelar edição ──
    function cancelarEdicao() {
        setEditandoId(null);
        setEditandoNome("");
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-[420px] flex flex-col gap-5 shadow-2xl max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="flex items-center justify-between">
                    <h3 className="text-[#e6edf3] font-semibold text-base m-0">Gerenciar categorias</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all duration-150 cursor-pointer"
                        title="Fechar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulário para criar */}
                <form onSubmit={handleCriar} className="flex gap-2">
                    <input
                        type="text"
                        value={novoNome}
                        onChange={(e) => { setNovoNome(e.target.value); setErro(null); }}
                        placeholder="Nova categoria..."
                        autoFocus
                        className="
                            flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2
                            text-[#e6edf3] text-sm placeholder:text-[#484f58]
                            focus:outline-none focus:border-indigo-500 transition-colors
                        "
                    />
                    <button
                        type="submit"
                        disabled={!novoNome.trim() || criando}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {criando ? "..." : "Criar"}
                    </button>
                </form>

                {/* Mensagem de erro */}
                {erro && (
                    <p className="text-red-400 text-xs m-0 -mt-2">{erro}</p>
                )}

                {/* Lista de categorias */}
                <div className="flex flex-col gap-1 overflow-y-auto pr-1 categoria-list">
                    {categorias.length === 0 ? (
                        <p className="text-[#484f58] text-sm text-center py-6 m-0">
                            Nenhuma categoria criada
                        </p>
                    ) : (
                        categorias.map((cat) => {
                            const cor = getCategoryColor(cat.id);
                            const estaEditando = editandoId === cat.id;

                            return (
                                <div
                                    key={cat.id}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#21262d] transition-colors group"
                                >
                                    {/* Badge de cor */}
                                    <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ background: cor.color }}
                                    />

                                    {estaEditando ? (
                                        /* ── Modo edição ── */
                                        <>
                                            <input
                                                type="text"
                                                value={editandoNome}
                                                onChange={(e) => { setEditandoNome(e.target.value); setErro(null); }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleSalvarEdicao();
                                                    if (e.key === "Escape") cancelarEdicao();
                                                }}
                                                autoFocus
                                                className="
                                                    flex-1 bg-[#0d1117] border border-indigo-500 rounded-md px-2 py-1
                                                    text-[#e6edf3] text-sm
                                                    focus:outline-none transition-colors
                                                "
                                            />
                                            <button
                                                onClick={handleSalvarEdicao}
                                                className="p-1 rounded text-green-400 hover:bg-green-500/10 transition-all duration-150 cursor-pointer"
                                                title="Salvar"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={cancelarEdicao}
                                                className="p-1 rounded text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all duration-150 cursor-pointer"
                                                title="Cancelar"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        /* ── Modo visualização ── */
                                        <>
                                            <span className="flex-1 text-[#e6edf3] text-sm">{cat.nome}</span>

                                            {/* Ações — aparecem ao hover */}
                                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                <button
                                                    onClick={() => iniciarEdicao(cat)}
                                                    className="p-1 rounded text-[#6e7681] hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150 cursor-pointer"
                                                    title="Editar"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setDeletandoId(cat.id)}
                                                    className="p-1 rounded text-[#6e7681] hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
                                                    title="Excluir"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Modal de confirmação de exclusão (inline) */}
                {deletandoId !== null && (
                    <div className="border-t border-[#30363d] pt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#e6edf3] text-sm font-medium m-0">Excluir categoria</p>
                                <p className="text-[#8b949e] text-xs m-0">
                                    Tarefas com essa categoria ficarão sem categoria.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeletandoId(null)}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-[#30363d] text-[#8b949e] text-sm hover:bg-[#21262d] transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmarDelete}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-sm font-medium hover:bg-red-500 transition-colors cursor-pointer"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriaManager;
