// 1. IMPORTING THE BLUEPRINT:
// 'messages' is the actual data (the list).
// 'type Message' is the rulebook that says what a message MUST look like.
import { messages, type Message } from '../data/messages'

/**
 * GET ALL MESSAGES
 * Return Type: Message[] (A box/array of many messages)
 */
export function getAllMessages(): Message[] {
  // We simply hand over the entire list of messages.
  return messages;
}

/**
 * CREATE A NEW MESSAGE
 * Parameters: user and text (Both must be strings)
 * Return Type: Message (Exactly ONE single message object)
 */
export function createMessage(user: string, text: string): Message  {
  
  // 1. MOLDING: We create a new object that fits our 'Message' blueprint.
  const newMessage: Message = {
    id: messages.length + 1,            // Give it the next ticket number
    user,                               // Assign the sender name
    text,                               // Assign the message content
    createdAt: new Date().toISOString(), // Add a "timestamp" of when it was made
  };

  // 2. STORING: Add this new piece of data to our global list.
  messages.push(newMessage)

  // 3. CONFIRMING: Return the single message we just created.
  return newMessage;
}