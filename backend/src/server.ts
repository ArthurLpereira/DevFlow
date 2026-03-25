import Fastify from 'fastify'
import { Tarefas } from './routes/tarefas.routes'
import { Categorias } from './routes/categorias.routes';

const app = Fastify({ logger: true })

app.register(Tarefas);
app.register(Categorias);

const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()