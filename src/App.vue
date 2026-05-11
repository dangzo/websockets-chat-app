<script setup lang="ts">
import { onMounted } from 'vue'
import { default as ChatLayout} from '@/components/layout/Default.vue'
import LoginView from '@/features/login/LoginView.vue'
import UsersList from '@/features/users-list/UsersList.vue'
import Chat from '@/features/chat/Chat.vue'
import useChatSocket from '@/features/chat/composables/useChatSocket'

const { connect, hasChosenName } = useChatSocket()

onMounted(() => {
  connect()
})
</script>

<template>
  <LoginView v-if="!hasChosenName" />

  <ChatLayout v-else>
    <template #sidebar>
      <UsersList />
    </template>

    <template #main>
      <Chat class="chat-panel" />
    </template>
  </ChatLayout>
</template>