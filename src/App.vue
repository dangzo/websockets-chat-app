<script setup lang="ts">
import { default as ChatLayout} from '@/components/layout/Default.vue'
import UsersList from '@/features/sidebar/UsersList.vue'
import Chat from '@/features/chat/Chat.vue'
import type { Message, User } from '@/types/chat'

const users = [
  { id: 1, name: 'Olivia', status: 'online' },
  { id: 2, name: 'Mateo', status: 'away' },
  { id: 3, name: 'Nina', status: 'online' },
  { id: 4, name: 'Jonas', status: 'offline' }
] satisfies User[]

const messages = [
  {
    id: 1,
    author: 'Olivia',
    text: 'Hey team, are we ready for today\'s deployment?',
    time: '09:42'
  },
  {
    id: 2,
    author: 'You',
    text: 'Almost. I am finishing the final smoke test now.',
    time: '09:44',
    own: true
  },
  {
    id: 3,
    author: 'Nina',
    text: 'Awesome, I can monitor logs once it is live.',
    time: '09:45'
  }
] satisfies Message[]


const handleSendMessage = (message: string) => {
  console.log('Send message:', message)
}

</script>

<template>
  <ChatLayout>
    <template #sidebar>
      <UsersList :users="users" />
    </template>
    <template #main>
      <Chat class="chat-panel" :messages="messages" @send="handleSendMessage" />
    </template>
  </ChatLayout>
</template>