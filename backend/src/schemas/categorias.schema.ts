import { z } from 'zod';

export const schemaCategorias = z.object({
    nome: z.string()
})

export type tipoCategoria = z.infer<typeof schemaCategorias>;

export const schemaPatchCategoria = schemaCategorias.partial();
export type tipoPatchCategoria = z.infer<typeof schemaPatchCategoria>;