export type Message = {
  id: number;
  user: string;
  text: string;
  createdAt: string;
};

export const messages: Message[] = [
  {
    id: 1,
    user: "Darun",
    text: "Hello!",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    user: "Avar",
    text: "Hi there",
    createdAt: new Date().toISOString(),
  }
];