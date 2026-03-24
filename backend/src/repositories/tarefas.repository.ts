import prisma from "../lib/prisma";
import type { PatchTarefas, TypesTarefas } from "../types/tarefas.types";

export async function criarTarefas(dados: TypesTarefas) {
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

export async function buscarTarefas() {
    const resultado = await prisma.tarefas.findMany();
    return resultado;
}

export async function buscarTarefasId(id: number) {
    const resultado = await prisma.tarefas.findUnique({
        where: {
            id: id
        }
    })

    return resultado;
}

export async function atualizarTarefa(id: number, dados: PatchTarefas) {
    const resultado = await prisma.tarefas.update({
        where: {
            id: id,
        },
        data: dados
    });

    return resultado;
}

export async function deletarTarefa(id: number) {
    const resultado = await prisma.tarefas.delete({
        where: {
            id: id
        }
    })

    return resultado;
}