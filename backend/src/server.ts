import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get('/health', async () => {
    return { status: 'ok', message: 'DevFlow API rodando 🚀' }
})

const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()