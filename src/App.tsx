// 1. IMPORTING THE TOOLS: Bringing in the Fastify framework to handle our web server.
import fastify from "fastify";

// 2. IMPORTING THE LOGIC: Bringing in the specific message instructions (The Pizza Recipes).
import { messageRoutes } from "./routes/messages";

/**
 * buildApp is like a "Construction Manager".
 * It builds the server and adds all the necessary equipment before we open.
 */
export function buildApp() {
  // 3. INITIALIZE: We create the app instance.
  // logger: true turns on our "Security Camera" to record every request in the terminal.
  const app = fastify({
    logger: true,
  });

  // 4. PLUGINS: We register our messageRoutes. 
  // This is like installing the "Message Counter" inside our main building.
  app.register(messageRoutes);

  // 5. DELIVERY: We return the finished app so our 'index.ts' can start it up.
  return app;
}