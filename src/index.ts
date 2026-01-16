import fastify from "fastify";

const server = fastify();

server.get('/messages', async () => {
 return [
    { id: 1, user: 'Alice', text: 'Hello!' },
    { id: 2, user: 'Bob', text: 'Hi there!' },
  ];
});

server.listen({ port: 3000}, () => {
  console.log('server running on http://localhost:3000');
})