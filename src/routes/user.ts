import sql from "../db";
import type { FastifyInstance } from "../server";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    //adding async to make a fulfilled promise
    const res = await sql`SELECT * FROM api_testing.usuarios`;
    reply.send(res);
  });

  fastify.post("/", async (req, reply) => {
    const { nome, cpf } = req.body as {
      nome: string;
      cpf: string;
    };
    await sql`INSERT INTO api_testing.usuarios (nome, cpf) VALUES (${nome},${cpf})`;
    reply.send("Usuário cadastrado com sucesso!");
  });

  fastify.get("/:id", async (req, reply) => {
    const { id } = req.params as { id: number };
    const res = await sql`SELECT * FROM api_testing.usuarios WHERE id = ${id}`;

    reply.send(res);
  });
}
