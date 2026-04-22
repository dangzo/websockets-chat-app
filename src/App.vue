<script setup lang="ts">
import { default as ChatLayout} from '@/components/layout/Default.vue'
import UsersList from '@/features/sidebar/UsersList.vue'
import Chat from '@/features/chat/Chat.vue'
import type { Message } from '@/types/chat'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

const messages = [
  {
    id: 1,
    authorId: 1,
    text: 'Hey team, are we ready for today\'s deployment?',
    timestamp: '09:42'
  },
  {
    id: 2,
    authorId: 2,
    text: 'Almost. I am finishing the final smoke test now.',
    timestamp: '09:44',
    own: true
  },
  {
    id: 3,
    authorId: 3,
    text: 'Awesome, I can monitor logs once it is live.',
    timestamp: '09:45'
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