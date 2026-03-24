import { TarefasStatus, TarefasPrioridade } from "@prisma/client";

export type TypesTarefas = {
    nome: string;
    descricao?: string;
    status: TarefasStatus;
    prioridade?: TarefasPrioridade;
    estimativa?: Date;
    categoriaId?: number;
}

export type PatchTarefas = Partial<TypesTarefas>;