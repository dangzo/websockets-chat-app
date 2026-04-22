import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Message } from '@/types/chat'

// TODO: remove mocked messages and fetch them from the server instead
const messageList = [
  {
    id: 1,
    authorId: 1,
    text: 'Hey team, are we ready for today\'s deployment?',
    timestamp: '2024-06-01T10:15:00Z'
  },
  {
    id: 2,
    authorId: 2,
    text: 'Almost. I am finishing the final smoke test now.',
    timestamp: '2024-06-01T10:17:00Z',
    own: true
  },
  {
    id: 3,
    authorId: 3,
    text: 'Awesome, I can monitor logs once it is live.',
    timestamp: '2024-06-01T10:18:00Z'
  }
] satisfies Message[]

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>(messageList)

  function addMessage(message: Message) {
    messages.value.push(message)
  }

  return {
    messages,
    addMessage
  }
});