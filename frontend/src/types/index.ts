export type TarefasPrioridade = "urgente" | "alta" | "media" | "baixa";
export type TarefasStatus = "a_fazer" | "em_andamento" | "fazendo" | "pronto";

export interface Categoria {
    id: number,
    nome: string,
}

export interface Tarefa {
    id: number,
    nome: string,
    descricao?: string
    status: TarefasStatus,
    prioridade: TarefasPrioridade,
    estimativa?: string | null,

    categoriaId: number | null,
    categoria?: Categoria
}

// Dados usados no formulário de edição
export type TarefaEditData = Pick<Tarefa, 'id' | 'nome' | 'descricao' | 'prioridade' | 'categoriaId'>;

export interface Coluna {
    id: number,
    titulo: string,
    status: TarefasStatus,
    tarefas: Tarefa[]
}

export interface BoardProps {
    colunas: Coluna[];
    onStatusChange: (id: number, novoStatus: TarefasStatus) => void;
    onDelete: (id: number) => void;
    onEdit: (dados: TarefaEditData) => void;
}