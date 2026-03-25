import { FastifyRequest, FastifyReply } from "fastify";
import type { TypesCategorias, PatchCategorias } from "../types/categorias.types";
import { criarCategorias, buscarCategorias, buscarCategoriaId, atualizarCategoria, deletarCategoria } from "../repositories/categorias.repository";
import { Prisma } from "@prisma/client";

export async function CriarCategoria(request: FastifyRequest<{ Body: TypesCategorias }>, reply: FastifyReply) {
    try {
        const data = request.body;

        const tarefa = await criarCategorias(data);
        return reply.status(201).send({ message: "Categoria criada com sucesso", data: tarefa });
    } catch (erro) {
        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function BuscarCategorias(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = await buscarCategorias();

        if (data.length === 0) {
            return reply.status(404).send({ message: "Não foi encontrada nenhuma categoria" })
        }

        return reply.status(200).send({ data: data });
    } catch (erro) {
        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function BuscarCategoriaId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const tarefa = await buscarCategoriaId(idNumber);

        if (!tarefa) {
            return reply.status(404).send({ message: "Categoria não encontrada" });
        }

        return reply.status(200).send({ data: tarefa });
    } catch (erro) {
        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function AtualizarCategoria(request: FastifyRequest<{ Params: { id: string }, Body: PatchCategorias }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const data = request.body;

        const tarefa = await atualizarCategoria(idNumber, data);
        return reply.status(200).send({ message: "Categoria atualizada com sucesso", data: tarefa });
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2025') {
                return reply.status(404).send({ message: "Categoria não encontrada" });
            }
        }

        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function DeletarCategoria(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const tarefa = await deletarCategoria(idNumber);

        return reply.status(204).send();
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2025') {
                return reply.status(404).send({ message: "Categoria não encontrada" });
            }
        }

        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}