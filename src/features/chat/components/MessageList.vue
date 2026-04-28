<template>
  <div class="messages" aria-live="polite">
    <MessageBlock
			v-for="(message, index) of messages"
			:key="message.id"
			:is-child="isChild(index)"
			:message="message"
		/>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat'
import MessageBlock from './MessageBlock.vue'

const props = defineProps<{
	messages: Message[]
}>()

const isChild = (index: number) => {
	return index > 0 && props.messages[index - 1].authorId === props.messages[index].authorId
}
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