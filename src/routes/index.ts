import { Type } from "@sinclair/typebox";
import type { FastifyInstance } from "../server";

import engual from "../assets/engual.jpg";
import musica from "../assets/musica.jpg";
import dls from "../assets/dls.jpg";
import nomes from "../assets/nomes.json";


export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    return reply.send("Ciao Mondo!");
  });

  fastify.get("/testing", async(_, reply) => {
    return reply.send("Good testing for you");
  })

  fastify.get("/database", async(_, reply) => {
    return reply.send("We don't have a database, I can't connect to localhost :(");
  })

  fastify.get("/silly", async(_, reply) => {
    return reply.send("Have you ever had a dream where where when you when you :(){ :|:& };: \n \
    sorry i got silly :p");
  })

  fastify.post(
    "/password/:user",
    {
      schema: {
        params: Type.Object({
          user: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
        }),
        body: Type.Object({
          password: Type.String({ minLength: 8, maxLength: 32 }),
        }),
        response: {
          200: Type.Object({
            user: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
            password: Type.String({ minLength: 8, maxLength: 32 }),
          }),
          400: Type.Literal("Invalid password"),
        },
      },
    },
    async (request, _reply) => {
      const { password } = request.body;
      const { user } = request.params;

      return {
        password,
        user,
      };
    },
  );

  fastify.get("/nomes", async(_, reply) => {
    return reply.send();
  })

  fastify.get("/tristeza", (_, reply) => {
    return reply.sendFile(engual);
  });

  fastify.get("/sewerslvt", (_, reply) => {
    return reply.sendFile(dls);
  })

  fastify.get("/musica", async (_, reply) => {
    return reply.sendFile(musica);
  });

  fastify.get("/confiavel", {}, (_, reply) => {
    return reply.sendFile(engual);
  });
}
