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

server.post('/messages', async (request) => {
  const body = request.body as {
    user: string;
    text: string;
  };

  const newMessages = {
    id: messages.length + 1,
    user: body.user,
    text: body.text,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessages);

  return newMessages;
});

server.listen({ port: 3000}, () => {
  console.log('server running on http://localhost:3000');
})