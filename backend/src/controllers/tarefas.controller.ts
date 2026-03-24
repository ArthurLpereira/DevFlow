import { FastifyRequest, FastifyReply } from "fastify";
import type { PatchTarefas, TypesTarefas } from "../types/tarefas.types";
import { criarTarefas, buscarTarefas, buscarTarefasId, atualizarTarefa, deletarTarefa } from "../repositories/tarefas.repository";
import { Prisma } from "@prisma/client";


export async function CriarTarefa(request: FastifyRequest<{ Body: TypesTarefas }>, reply: FastifyReply) {
    try {
        const data = request.body;

        const tarefas = await criarTarefas(data);

        return reply.status(201).send({ message: "Criado com sucesso", data: tarefas });
    } catch (erro) {
        console.error(erro)
        return reply.status(500).send({ message: "Erro ao criar tarefa" });
    }

}

export async function BuscarTarefas(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = await buscarTarefas();

        if (data.length === 0) {
            return reply.status(404).send({ message: "Não existe tarefas criadas" });
        }

        return reply.status(200).send({ data: data });
    } catch (erro) {
        console.error(erro)
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function BuscarTarefaId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);
        const tarefa = await buscarTarefasId(idNumber);

        if (!tarefa) {
            return reply.status(404).send({ message: "Tarefa não encontrada" });
        }

        return reply.status(200).send({ data: tarefa });
    } catch (erro) {
        console.error(erro)
        return reply.status(500).send({ message: "Erro interno no servidor" });
    }
}

export async function PatchTarefa(request: FastifyRequest<{ Params: { id: string }, Body: PatchTarefas }>, reply: FastifyReply) {

    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const data = request.body;

        const tarefa = await atualizarTarefa(idNumber, data);

        return reply.status(200).send({ message: "Tarefa atualizada com sucesso", data: tarefa });
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2025') {
                return reply.status(404).send({ message: "Tarefa não encontrada" });
            }
        }
        console.error(erro)
        return reply.status(500).send({ message: "Erro interno no servidor" });

    }
}

export async function DeleteTarefa(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const idString = request.params.id;
        const idNumber = Number(idString);

        const tarefa = await deletarTarefa(idNumber);

        return reply.status(204).send();

    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code == 'P2025') {
                return reply.status(404).send({ message: "Tarefa não encontrada" });
            }
        }
        console.error(erro)
        return reply.status(500).send({ message: "Erro interno no servidor" });

    }

}