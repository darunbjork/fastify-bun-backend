import type { FastifyInstance } from "fastify";
import { messages, type Message } from "../data/messages";

/**
 * messageRoutes is a "Plugin". 
 * Think of it as a specialized "Station" in our shop that only handles Messages.
 */
export async function messageRoutes(server: FastifyInstance) {
  
  // ROUTE 1: The "Menu" (GET)
  // When someone asks for /messages, we just show them our list.
  server.get('/messages', async () => {
    return messages; // Fastify automatically "packs" this into JSON (The Box)
  });

  // ROUTE 2: The "Order Taker" (POST)
  // This is used when a customer wants to add a NEW message to the board.
  server.post('/messages', {
    schema: {
      body: {
        type: 'object',
        required: ['user', 'text'],
        properties: {
          user: { type: 'string', minLength: 1 },
          text: { type: 'string', minLength: 1 },
        },
      },
    },
  }, async (request, replay) => {
    
    // 1. UNPACKING: We tell TypeScript to treat the "Box" content as a User and Text.
    // (The 'as' keyword is our Labeling Machine)
    const body = request.body as {
      user: string,
      text: string,
    };

    // 2. TICKET GENERATOR: We build a new Message object.
    const newMessage: Message = {
      id: messages.length + 1,            // Generate a unique ID (Ticket Number)
      user: body.user,                    // Pull the name from the box
      text: body.text,                    // Pull the text from the box
      createdAt: new Date().toISOString(), // Stick a timestamp on it
    };

    // 3. SAVING: We push the new "Order" into our array (The Message Board)
    messages.push(newMessage);

    // 4. RECEIPT: We send the new message back to the user as confirmation.
    return replay.code(201).send(newMessage);
  })
}