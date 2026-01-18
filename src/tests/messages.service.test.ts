import { describe, it, expect, beforeEach } from "bun:test";
import { getAllMessages, createMessage } from "@/services/messages.service";
import { messages } from "@/data/messages";

describe('Message service', () => {
  beforeEach(() => {
    messages.length = 0
  });

  it('should start with empty message', () => {
    const allMessages = getAllMessages();
    expect(allMessages.length).toBe(0);
  });

  it('should create a new message', () => {
    const message = createMessage('Alice', 'Hello Test');

    expect(message.user).toBe('Alice');
    expect(message.text).toBe('Hello Test');
    expect(message.id).toBe(1);
  });

  it('should add message to the list', () => {
    createMessage('Bob', 'First');
    createMessage('Bob', 'Second');

    const allMessages = getAllMessages();
    expect(allMessages.length).toBe(2)
  })
})