import prisma from "../lib/prisma";
import type { PostTarefas } from "../types/tarefas.types";

export async function criarTarefas(dados: PostTarefas) {
    const resultado = await prisma.tarefas.create({
        data: {
            nome: dados.nome,
            descricao: dados.descricao,
            status: dados.status,
            prioridade: dados.prioridade,
            estimativa: dados.estimativa,
            categoriaId: dados.categoriaId
        }
    })

    return resultado;
}