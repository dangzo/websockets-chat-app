<script setup lang="ts">
import { MessageList, SendMsgForm } from './components'
import useChatSocket from './composables/useChatSocket'

const { currentClientName, isConnected, sendMessage, messages } = useChatSocket()
</script>

<template>
	<section aria-label="Chat window">
		<header class="chat-header">
			<div>
				<h1>Web Chat</h1>
				<p class="subtitle">Signed in as {{ currentClientName }}</p>
			</div>
			<p class="status" :class="{ connected: isConnected }">
				{{ isConnected ? 'Connected' : 'Connecting...' }}
			</p>
		</header>

		<MessageList :messages="messages" />
		<SendMsgForm @send="sendMessage" />
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
	display: flex;
	align-items: center;
	justify-content: space-between;

	h1 {
		margin: 0 0 4px;
		font-size: 28px;
	}
}

.subtitle {
	font-size: 14px;
	color: var(--text);
}

.status {
	margin: 0;
	font-size: 13px;
	color: var(--text);

	&.connected {
		color: #22c55e;
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
