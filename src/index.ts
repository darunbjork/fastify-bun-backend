import fastify from "fastify";

let messages = [
  {
    id: 1,
    user: 'Alice',
    text: 'Hello!',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    user: 'Bob',
    text: 'Hello!',
    createdAt: new Date().toISOString()
  }
]

const server = fastify();

server.get('/messages', async () => {
 return messages;
});

// server.post('/messages', async (request) => {
//   const body = request.body as {
//     user: string;
//     text: string;
//   };

//   const newMessages = {
//     id: messages.length + 1,
//     user: body.user,
//     text: body.text,
//     createdAt: new Date().toISOString(),
//   };

//   messages.push(newMessages);

//   return newMessages;
// });

server.post('/messages', async (request, reply) => {
  try {
    const { user, text } = request.body;

    // 1. The Pause: We simulate a 2-second delay (like a slow database)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. The Logic: Let's pretend it fails if the message is empty
    if (!text) {
      throw new Error("Empty message");
    }

    const newMessage = {
      id: messages.length + 1,
      user,
      text,
      createdAt: new Date().toISOString(),
    };
    
    messages.push(newMessage);

    // 3. Success Message back to you
    return { status: "success", data: newMessage };

  } catch (error) {
    // 4. Failure Message: "Message failed to send. Tap to retry."
    return reply.status(500).send({ 
      status: "error", 
      message: "Message failed to send. Tap to retry." 
    });
  }
});

/* darunbjork@MacBookAir fastify-bun-backend % curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"user":"You","text":""}'
  
{"status":"error","message":"Message failed to send. Tap to retry."}%                                                                                                                                   darunbjork@MacBookAir fastify-bun-backend %  */

server.listen({ port: 3000}, () => {
  console.log('server running on http://localhost:3000');
})