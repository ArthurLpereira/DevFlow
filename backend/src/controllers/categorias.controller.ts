import { FastifyRequest, FastifyReply } from "fastify";
import { criarCategorias, buscarCategorias, buscarCategoriaId, atualizarCategoria, deletarCategoria } from "../repositories/categorias.repository";
import { Prisma } from "@prisma/client";
import { schemaCategorias, schemaPatchCategoria, tipoCategoria, tipoPatchCategoria } from "../schemas/categorias.schema";
import { ZodError } from "zod";

export async function CriarCategoria(request: FastifyRequest<{ Body: tipoCategoria }>, reply: FastifyReply) {
    try {
        const data = request.body;

        const dadosValidados = schemaCategorias.parse(data);

        const categoria = await criarCategorias(dadosValidados);
        return reply.status(201).send({ message: "Categoria criada com sucesso", data: categoria });
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2002') {
                return reply.status(409).send({ message: "Já existe uma categoria com esse nome" });
            }
        }
        if (erro instanceof ZodError) {
            return reply.status(400).send({ message: erro.issues });
        }
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

        const categoria = await buscarCategoriaId(idNumber);

        if (!categoria) {
            return reply.status(404).send({ message: "Categoria não encontrada" });
        }

        return reply.status(200).send({ data: categoria });
    } catch (erro) {
        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function AtualizarCategoria(request: FastifyRequest<{ Params: { id: string }, Body: tipoPatchCategoria }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const data = request.body;
        const dadosValidados = schemaPatchCategoria.parse(data);

        const categoria = await atualizarCategoria(idNumber, dadosValidados);
        return reply.status(200).send({ message: "Categoria atualizada com sucesso", data: categoria });
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2025') {
                return reply.status(404).send({ message: "Categoria não encontrada" });
            } else if (erro.code == 'P2002') {
                return reply.status(409).send({ message: "Já existe uma categoria com esse nome" });
            }
        }
        if (erro instanceof ZodError) {
            return reply.status(400).send({ message: erro.issues });
        }
        console.error(erro);
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function DeletarCategoria(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const categoria = await deletarCategoria(idNumber);

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