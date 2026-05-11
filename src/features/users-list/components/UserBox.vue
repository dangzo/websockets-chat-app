<template>
	<li class="user-item" :class="{ current: isCurrentUser }">
		<span class="status-dot" :class="`is-${user.status}`" aria-hidden="true"></span>
		<span class="user-name">{{ user.name }}</span>
	</li>
</template>

<script setup lang="ts">
import type { User } from '@/types/chat'

defineProps<{
	user: User
	isCurrentUser?: boolean
}>()
</script>

<style scoped lang="scss">
.user-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px 12px;
	border: 1px solid var(--border);
	border-radius: 10px;
	background: var(--bg);

	&.current {
		border-color: var(--accent-border);
		background: var(--accent-bg);
	}
}

.status-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #94a3b8;

	&.is-online {
		background: #22c55e;
	}

	&.is-away {
		background: #f59e0b;
	}

	&.is-offline {
		background: #94a3b8;
	}
}

.user-name {
	color: var(--text-h);
	font-weight: 500;
}
</style>