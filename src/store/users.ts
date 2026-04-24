import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/chat'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  function setUsers(newUsers: User[]) {
    users.value = newUsers
  }

  function updateUser(updatedUser: User) {
    const index = users.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  function addUser(newUser: User) {
    users.value.push(newUser)
  }

  function removeUser(userId: number) {
    users.value = users.value.filter(user => user.id !== userId)
  }

  return {
    users,
    setUsers,
    updateUser,
    addUser,
    removeUser
  }
});