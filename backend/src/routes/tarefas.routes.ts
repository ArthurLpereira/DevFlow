import { FastifyInstance } from "fastify";
import { BuscarTarefaId, BuscarTarefas, CriarTarefa, DeleteTarefa, PatchTarefa } from "../controllers/tarefas.controller";

export async function Tarefas(app: FastifyInstance) {

    app.post('/tarefas', CriarTarefa);
    app.get('/tarefas', BuscarTarefas);
    app.get('/tarefas/:id', BuscarTarefaId);
    app.patch('/tarefas/:id', PatchTarefa);
    app.delete('/tarefas/:id', DeleteTarefa);
}