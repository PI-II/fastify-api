import db from "../db";
import type { FastifyInstance } from "../server";

export default async function (fastify:FastifyInstance) {
  fastify.get("/", async (req, reply) => { //adding async to make a fulfilled promise
    const [users] = await db.query("SELECT * FROM api_testing.usuarios");
    reply.send(users);
  })
}