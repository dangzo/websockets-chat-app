<template>
  <div class="messages" aria-live="polite">
    <MessageBlock v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat'
import MessageBlock from './MessageBlock.vue'

defineProps<{
	messages: Message[]
}>()
</script>

<style scoped lang="scss">
.messages {
	padding: 24px;
	overflow-y: auto;
	display: grid;
	align-content: start;
	gap: 14px;
}

@media (max-width: 560px) {
	.messages {
		padding: 16px;
	}
}
</style>