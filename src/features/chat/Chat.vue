<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '@/store/messages'
import MessageList from './components/MessageList.vue'
import SendMsgForm from './components/SendMsgForm.vue'

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)

const handleSendMessage = (message: string) => {
  messagesStore.addMessage({
    id: messages.value.length + 1,
    authorId: 1, // Replace with the actual author ID
    text: message,
    timestamp: new Date().toISOString(),
    own: true
  })
}

</script>

<template>
	<section aria-label="Chat window">
		<header class="chat-header">
			<h1>Web Chat</h1>
		</header>

		<MessageList :messages="messages" />

		<SendMsgForm @send="handleSendMessage" />
	</section>
</template>

<style scoped lang="scss">
section {
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 100svh;
}

.chat-header {
	padding: 20px 24px;
	border-bottom: 1px solid var(--border);

	h1 {
		margin: 0;
		font-size: 28px;
	}
}

@media (max-width: 900px) {
	section {
		min-height: auto;
	}
}

@media (max-width: 560px) {
	.chat-header {
		padding: 16px;
	}
}
</style>
