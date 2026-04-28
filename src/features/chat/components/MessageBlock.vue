<template>
  <article :key="message.id" class="message" :class="{ own: message.own }">
		<p class="author" v-if="!isChild">{{ message.authorName }}</p>
    <div class="bubble">
			{{ message.text }}
    	<time class="time">{{ messageDate }}</time>
		</div>
  </article>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat'
import { computed } from 'vue'

const props = defineProps<{
  message: Message,
	isChild: Boolean
}>()

const messageDate = computed(() => new Date(props.message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
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
	position: relative;
	bottom: -8px;
	margin-left: 6px;
	font-size: 10px;
	color: var(--text);
}
</style>
