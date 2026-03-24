import { FastifyRequest, FastifyReply } from "fastify";
import type { PatchTarefas, TypesTarefas } from "../types/tarefas.types";
import { criarTarefas, buscarTarefas, buscarTarefasId, atualizarTarefa, deletarTarefa } from "../repositories/tarefas.repository";


export async function CriarTarefa(request: FastifyRequest<{ Body: TypesTarefas }>, reply: FastifyReply) {
    const data = request.body;

    const tarefas = await criarTarefas(data);

    return reply.status(201).send({ message: "Criado com sucesso", data: tarefas });

}

export async function BuscarTarefas(request: FastifyRequest, reply: FastifyReply) {
    const data = await buscarTarefas();

    return reply.status(200).send({ data: data });
}

export async function BuscarTarefaId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const idString = request.params.id;
    const idNumber = Number(idString);

    const tarefa = await buscarTarefasId(idNumber);

    return reply.status(200).send({ data: tarefa });
}

export async function PatchTarefa(request: FastifyRequest<{ Params: { id: string }, Body: PatchTarefas }>, reply: FastifyReply) {
    const idString = request.params.id;
    const idNumber = Number(idString);
    const data = request.body;

    const tarefa = await atualizarTarefa(idNumber, data);

    return reply.status(200).send({ message: "Tarefa atualizada com sucesso", data: tarefa });
}

export async function DeleteTarefa(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const idString = request.params.id;
    const idNumber = Number(idString);

    const tarefa = await deletarTarefa(idNumber);

    return reply.status(204).send();
}