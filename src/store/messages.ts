import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Message } from '@/types/chat'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])

  function addMessage(message: Message) {
    messages.value.push(message)
  }

  function resetMessages(nextMessages: Message[] = []) {
    messages.value = nextMessages
  }

  return {
    messages,
    addMessage,
    resetMessages
  }
});