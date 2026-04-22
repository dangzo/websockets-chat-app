<script setup lang="ts">
import { default as ChatLayout} from '@/components/layout/Default.vue'
import UsersList from '@/features/sidebar/UsersList.vue'
import Chat from '@/features/chat/Chat.vue'
</script>

<template>
  <ChatLayout>
    <template #sidebar>
      <UsersList />
    </template>

    <template #main>
      <Chat class="chat-panel" />
    </template>
  </ChatLayout>
</template>