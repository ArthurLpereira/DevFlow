import { TarefasStatus, TarefasPrioridade } from "@prisma/client";

export type PostTarefas = {
    nome: string;
    descricao?: string;
    status: TarefasStatus;
    prioridade?: TarefasPrioridade;
    estimativa?: Date;
    categoriaId?: number;
}

