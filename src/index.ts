import { buildApp } from "./App";

const app = buildApp();

app.listen({ port: 3000}, () => {
  console.log('Server is running on http://localhost:3000 ')
})