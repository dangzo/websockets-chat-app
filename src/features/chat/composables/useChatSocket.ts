import { computed, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '@/store/messages'
import { useUsersStore } from '@/store/users'
import type { Message, ServerClient, ServerEvent, User } from '@/types/chat'

let socket: WebSocket | null = null
let activeConnections = 0
const currentClientId = ref<number | null>(null)
const currentClientName = ref('')
const hasChosenName = ref(false)
const connectionState = ref<'connecting' | 'open' | 'closed'>('closed')

function resolveSocketUrl() {
  const explicitUrl = import.meta.env.VITE_SERVER_URL

  if (explicitUrl) {
    return explicitUrl
  }

  // Auto-detect: use same host as the page, connect via /ws
  // Works for both local dev (Vite proxy) and production (Nginx proxy)
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const { host } = window.location

  return `${protocol}//${host}/ws`
}

function toUser(client: ServerClient): User {
  return {
    id: client.id,
    name: client.name,
    status: 'online',
  }
}

function mergeUsers(clients: ServerClient[]) {
  const nextUsers = new Map<number, User>()

  for (const client of clients) {
    nextUsers.set(client.id, toUser(client))
  }

  return Array.from(nextUsers.values())
}

function toMessage(event: Extract<ServerEvent, { type: 'chat_message' }>): Message {
  return {
    id: `${event.client.id}-${event.sentAt}`,
    authorId: event.client.id,
    authorName: event.client.name,
    text: event.text,
    timestamp: event.sentAt,
    own: event.client.id === currentClientId.value,
  }
}

const useChatSocket = () => {
  const messagesStore = useMessagesStore()
  const usersStore = useUsersStore()
  const { messages } = storeToRefs(messagesStore)
  const { users } = storeToRefs(usersStore)
  let ownsConnection = false

  const isConnected = computed(() => connectionState.value === 'open')

  function connect() {
    if (ownsConnection) {
      return
    }

    ownsConnection = true
    activeConnections += 1

    if (socket && socket.readyState !== WebSocket.CLOSED) {
      return
    }

    socket = new WebSocket(resolveSocketUrl())
    connectionState.value = 'connecting'

    socket.addEventListener('open', () => {
      connectionState.value = 'open'
    })

    socket.addEventListener('message', (event) => {
      let payload: ServerEvent

      try {
        payload = JSON.parse(event.data) as ServerEvent
      } catch {
        return
      }

      if (payload.type === 'welcome') {
        currentClientId.value = payload.client.id
        currentClientName.value = payload.client.name
        usersStore.setUsers(mergeUsers([...payload.clients, payload.client]))
        return
      }

      if (payload.type === 'presence') {
        if (payload.action === 'joined' || payload.action === 'updated') {
          const nextUser = toUser(payload.client)

          if (users.value.some((user) => user.id === payload.client.id)) {
            usersStore.updateUser(nextUser)
          } else {
            usersStore.addUser(nextUser)
          }
        }

        if (payload.action === 'left') {
          usersStore.removeUser(payload.client.id)
        }

        return
      }

      if (payload.type === 'chat_message') {
        messagesStore.addMessage(toMessage(payload))
        return
      }

      if (payload.type === 'profile') {
        currentClientId.value = payload.client.id
        currentClientName.value = payload.client.name
        hasChosenName.value = true
        const nextUser = toUser(payload.client)

        if (users.value.some((user) => user.id === payload.client.id)) {
          usersStore.updateUser(nextUser)
        } else {
          usersStore.addUser(nextUser)
        }
      }
    })

    socket.addEventListener('close', () => {
      connectionState.value = 'closed'
      socket = null
      currentClientId.value = null
      currentClientName.value = ''
      hasChosenName.value = false
      usersStore.setUsers([])
    }, { once: true })

    socket.addEventListener('error', () => {
      connectionState.value = 'closed'
    })
  }

  function disconnect() {
    if (!ownsConnection) {
      return
    }

    ownsConnection = false
    activeConnections = Math.max(0, activeConnections - 1)

    if (activeConnections === 0 && socket) {
      socket.close()
      socket = null
    }
  }

  function setName(name: string) {
    const value = name.trim()

    if (!value || !socket || socket.readyState !== WebSocket.OPEN) {
      return false
    }

    socket.send(
      JSON.stringify({
        type: 'set_name',
        name: value,
      }),
    )

    return true
  }

  function sendMessage(text: string) {
    const value = text.trim()

    if (!value || !socket || socket.readyState !== WebSocket.OPEN) {
      return false
    }

    socket.send(
      JSON.stringify({
        type: 'chat_message',
        text: value,
      }),
    )

    return true
  }

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    connect,
    currentClientId,
    currentClientName,
    disconnect,
    hasChosenName,
    isConnected,
    messages,
    setName,
    sendMessage,
    users,
  }
}

export default useChatSocket