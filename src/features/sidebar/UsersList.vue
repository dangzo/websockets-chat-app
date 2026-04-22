<template>
	<aside aria-label="Users list" class="users-panel">
		<div class="users-header">
			<h2>Users</h2>
			<Pill>{{ users.length }}</Pill>
		</div>

		<ul class="users-list">
			<UserBox v-for="user in users" :key="user.id" :user="user" />
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { Pill } from '@/components/ui'
import UserBox from './components/UserBox.vue'

import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
</script>

<style scoped lang="scss">
.users-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;

	h2 {
		margin: 0;
		font-size: 20px;
	}
}

.users-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 10px;
}

.users-panel {
  border-right: 1px solid var(--border);
  padding: 24px 18px;
  background: linear-gradient(180deg, var(--social-bg), transparent 58%);
}

@media (max-width: 900px) {
	.users-list {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.users-panel {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 16px;
  }
}

@media (max-width: 560px) {
	.users-list {
		grid-template-columns: 1fr;
	}
}
</style>
