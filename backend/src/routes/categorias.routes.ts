import { FastifyInstance } from "fastify";
import { CriarCategoria, BuscarCategorias, BuscarCategoriaId, AtualizarCategoria, DeletarCategoria } from "../controllers/categorias.controller";

export async function Categorias(app: FastifyInstance) {
    app.post('/categorias', CriarCategoria);
    app.get('/categorias', BuscarCategorias);
    app.get('/categorias/:id', BuscarCategoriaId);
    app.patch('/categorias/:id', AtualizarCategoria);
    app.delete('/categorias/:id', DeletarCategoria);
}