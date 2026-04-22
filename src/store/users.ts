import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/chat'

// TODO: remove mocked users and fetch them from the server instead
const usersList = [
  { id: 1, name: 'Olivia', status: 'online' },
  { id: 2, name: 'Mateo', status: 'away' },
  { id: 3, name: 'Nina', status: 'online' },
  { id: 4, name: 'Jonas', status: 'offline' }
] satisfies User[]

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>(usersList)

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