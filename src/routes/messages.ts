import type { FastifyInstance } from "fastify";
import { messages, type Message } from "../data/messages";

export async function messageRoutes(server: FastifyInstance) {
  server.get('/messages', async () => {
    return messages;
  });

  server.post('/messages', async (req) => {
    const body = req.body as {
      user: string,
      text: string,
    };
    const newMessage: Message = {
      id: messages.length + 1,
      user: body.user,
      text: body.text,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    return newMessage;
  })
}