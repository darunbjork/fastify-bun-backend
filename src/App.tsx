import fastify from "fastify";
import { messageRoutes } from "./routes/messages";

export function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.register(messageRoutes);

  return app;
}