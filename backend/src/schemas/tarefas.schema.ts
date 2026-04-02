import { z } from 'zod';

export const schemaTarefas = z.object({
    nome: z.string(),
    descricao: z.string().optional(),
    status: z.enum(['a_fazer', 'em_andamento', 'fazendo', 'pronto']),
    prioridade: z.enum(['urgente', 'alta', 'media', 'baixa']).optional(),
    estimativa: z.date().optional(),
    categoriaId: z.number().optional()
})

export type TipoTarefa = z.infer<typeof schemaTarefas>;


export const schemaPatch = schemaTarefas.partial();
export type TipoPatch = z.infer<typeof schemaPatch>;