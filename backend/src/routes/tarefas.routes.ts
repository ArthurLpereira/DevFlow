import { FastifyInstance } from "fastify";
import type { PostTarefas } from "../types/tarefas.types";

export async function Tarefas(app: FastifyInstance) {

    app.post<{ Body: PostTarefas }>('/tarefas', async (request, reply) => {
        const { nome, descricao, status, prioridade, estimativa, categoriaId } = request.body;

        return reply.status(200).send({ message: 'Criado' })
    });
}