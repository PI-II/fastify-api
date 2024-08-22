import sql from "../db";
import type { FastifyInstance } from "../server";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    const sessions = await sql`SELECT * FROM 
    api_testing.sessoes`;
    reply.send(sessions);
  });

  fastify.post("/", async (req, reply) => {
    const { id_usuario, inicio, fim, usuario_presente } = req.body as {
      id_usuario: number;
      inicio: string;
      fim: string;
      usuario_presente: boolean;
    };

    await sql`INSERT INTO 
    api_testing.sessoes (id_usuario, inicio, fim, usuario_presente) 
    VALUES (${id_usuario}, ${inicio}, ${fim}, ${usuario_presente})`;
    reply.send("Sessão registrada com sucesso!");
  });

  fastify.get("/:id_user", async (req, reply) => {
    const { id_user } = req.params as { id_user: string };
    const res =
      await sql`SELECT id_usuario, inicio, fim, usuario_presente FROM api_testing.sessoes WHERE id_usuario = ${id_user}`;
    reply.send(res);
  });

  fastify.get("/presenca/:id_user", async (req, reply) => {
    const { id_user } = req.params as { id_user: string };
    const sessions =
      await sql`SELECT id_usuario, inicio, fim, usuario_presente FROM api_testing.sessoes WHERE id_usuario = ${id_user} AND usuario_presente = 1`;
    reply.send(sessions);
  });
}
