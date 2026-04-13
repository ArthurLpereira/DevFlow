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
    estimativa?: Date,

    CategoriaId: number,
    categoria?: Categoria
}

export interface Coluna {
    id: number,
    titulo: string,
    tarefas: Tarefa[]
}

export interface BoardProps {
    colunas: Coluna[]
}