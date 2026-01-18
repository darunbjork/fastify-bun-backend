import type { FastifyInstance } from "fastify";
// We import our "Chef's" functions from the service file we commented on earlier
import { getAllMessages, createMessage } from "@/services/messages.service";

/**
 * messageRoutes: The "Message Department" of our app.
 */
export async function messageRoutes(server: FastifyInstance) {
  
  // ROUTE 1: The "Menu" (GET)
  server.get('/messages', async () => {
    // We ask the service (the chef) to give us the current list
    return getAllMessages(); 
  });

  // ROUTE 2: The "Order Taker" (POST)
  server.post('/messages', {
    // THE SECURITY GUARD (Schema): 
    // This checks the "Box" (JSON) before your code even touches it.
    schema: {
      body: {
        type: 'object',
        required: ['user', 'text'], // If these are missing, the guard kicks the request out!
        properties: {
          user: { type: 'string', minLength: 1 }, // Must be text, cannot be empty
          text: { type: 'string', minLength: 1 },
        },
      },
    },
  }, async (request, replay) => {
    
    // 1. LABELING: We tell TypeScript what's inside the validated request body.
    const body = request.body as {
      user: string,
      text: string,
    };

    // 2. ACTION: We send the ingredients to the service to create the new message.
    const newMessage = createMessage(body.user, body.text);
  
    // 3. SUCCESS RESPONSE: 
    // .code(201) is the universal code for "Successfully Created!"
    return replay.code(201).send(newMessage);
  })
}