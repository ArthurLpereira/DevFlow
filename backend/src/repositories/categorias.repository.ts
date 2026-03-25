import prisma from "../lib/prisma";
import type { TypesCategorias, PatchCategorias } from "../types/categorias.types";


export async function criarCategorias(dados: TypesCategorias) {
    const resultado = await prisma.categoria.create({
        data: {
            nome: dados.nome
        }
    })

    return resultado;
}

export async function buscarCategorias() {
    const resultado = await prisma.categoria.findMany();
    return resultado;
}

export async function buscarCategoriaId(id: number) {
    const resultado = await prisma.categoria.findUnique({
        where: {
            id: id
        }
    })

    return resultado;
}

export async function atualizarCategoria(id: number, dados: PatchCategorias) {
    const resultado = await prisma.categoria.update({
        where: {
            id: id
        },
        data: dados
    });

    return resultado
}

export async function deletarCategoria(id: number) {
    const resultado = await prisma.categoria.delete({
        where: {
            id: id
        }
    });

    return resultado;
}