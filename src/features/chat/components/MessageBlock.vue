<template>
  <article :key="message.id" class="message" :class="{ own: message.own }">
    <p class="author">{{ message.authorId }}</p>
    <p class="bubble">{{ message.text }}</p>
    <time class="time">{{ message.timestamp }}</time>
  </article>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
}>()
</script>

<style scoped lang="scss">
.message {
	max-width: min(80%, 620px);

	&.own {
		margin-left: auto;
		text-align: right;

		.bubble {
			background: var(--accent-bg);
			border-color: var(--accent-border);
		}
	}
}

.author {
	margin: 0 0 5px;
	font-size: 13px;
	color: var(--text);
}

.bubble {
	margin: 0;
	padding: 11px 14px;
	border-radius: 12px;
	border: 1px solid var(--border);
	color: var(--text-h);
	background: var(--bg);
}

.time {
	display: inline-block;
	margin-top: 6px;
	font-size: 12px;
	color: var(--text);
}
</style>
