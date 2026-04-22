<template>
	<form class="composer" @submit.prevent="submitMessage">
		<label for="message-input" class="sr-only">Type a message</label>
		<input id="message-input" v-model="message" type="text" placeholder="Type your message..." />
		<button type="submit">Send</button>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits<{
	send: [message: string]
}>()

const submitMessage = () => {
	const value = message.value.trim()
	if (!value) {
		return
	}

	emit('send', value)
	message.value = ''
}
</script>

<style scoped lang="scss">
.composer {
	padding: 16px 24px;
	border-top: 1px solid var(--border);
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 12px;

	input {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 12px 14px;
		font: inherit;
		color: var(--text-h);
		background: var(--bg);
	}

	button {
		border: 1px solid var(--accent-border);
		border-radius: 12px;
		padding: 12px 20px;
		font: inherit;
		font-weight: 600;
		color: var(--text-h);
		background: var(--accent-bg);
		cursor: pointer;

		&:hover {
			filter: brightness(1.02);
		}
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

@media (max-width: 560px) {
	.composer {
		padding: 12px 16px 16px;
		grid-template-columns: 1fr;
	}
}
</style>
