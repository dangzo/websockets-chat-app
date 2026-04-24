<script setup lang="ts">
import { computed, ref } from 'vue'
import useChatSocket from '../chat/composables/useChatSocket'

const { isConnected, setName } = useChatSocket()

const userName = ref('')

const canSubmit = computed(() => {
	return isConnected.value && userName.value.trim().length > 0
})

function submitName() {
	if (!canSubmit.value) {
		return
	}

	setName(userName.value)
	userName.value = ''
}
</script>

<template>
	<section class="login-screen" aria-label="Login view">
		<div class="login-card">
			<p class="eyebrow">WebSocket Chat</p>
			<h1>What's your name?</h1>

			<form class="login-form" @submit.prevent="submitName">
				<label for="user-name" class="label">User name</label>
				<input
					id="user-name"
					v-model="userName"
					autocomplete="nickname"
					maxlength="30"
					placeholder="Enter your name"
					type="text"
				/>
				<button :disabled="!canSubmit" type="submit">
					{{ isConnected ? 'Enter chat' : 'Connecting...' }}
				</button>
			</form>
		</div>
	</section>
</template>

<style scoped lang="scss">
.login-screen {
	min-height: 100svh;
	display: grid;
	place-items: center;
	padding: 24px;
	background:
		radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 16%, transparent), transparent 34%),
		linear-gradient(180deg, var(--social-bg), transparent 62%);
}

.login-card {
	width: min(100%, 460px);
	padding: 32px;
	border: 1px solid var(--border);
	border-radius: 24px;
	background: var(--bg);
	box-shadow: var(--shadow);
	text-align: left;
}

.eyebrow {
	margin-bottom: 12px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--accent);
}

h1 {
	margin: 0 0 12px;
	font-size: 2rem;
	line-height: 1;
	letter-spacing: -0.04em;
}

.copy {
	margin-bottom: 24px;
	color: var(--text);
}

.login-form {
	display: grid;
	gap: 12px;
}

.label {
	font-size: 14px;
	font-weight: 600;
	color: var(--text-h);
}

input,
button {
	border-radius: 14px;
	padding: 14px 16px;
	font: inherit;
}

input {
	border: 1px solid var(--border);
	color: var(--text-h);
	background: var(--bg);
}

button {
	border: 1px solid var(--accent-border);
	font-weight: 700;
	color: var(--text-h);
	background: var(--accent-bg);
	cursor: pointer;

	&:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}
	}

@media (max-width: 560px) {
	.login-screen {
		padding: 16px;
	}

	.login-card {
		padding: 24px 20px;
		border-radius: 18px;
	}
}
</style>