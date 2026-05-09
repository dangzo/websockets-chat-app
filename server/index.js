import { createServer } from 'node:http'
import { Server } from 'socket.io'

const port = Number(process.env.PORT ?? 3001)
const host = process.env.WS_HOST ?? '0.0.0.0'

const server = createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(
    JSON.stringify({
      status: 'ok',
      websocket: `ws://${request.headers.host ?? `localhost:${port}`}`,
    }),
  )
})

const io = new Server(server, {
  path: '/ws',
  transports: ['websocket'],
})

const clients = new Map()
let nextClientId = 1

function broadcast(payload, excludedSocketId) {
  for (const socket of io.sockets.sockets.values()) {
    if (socket.id !== excludedSocketId) {
      socket.emit('server_event', payload)
    }
  }
}

io.on('connection', (socket) => {
  const clientId = nextClientId
  nextClientId += 1

  const client = {
    id: clientId,
    name: `User ${clientId}`,
  }

  clients.set(socket, client)

  socket.emit('server_event', {
    type: 'welcome',
    client,
    clients: Array.from(clients.values()),
    onlineCount: clients.size,
  })

  console.log(`Client connected: ${client.name} (ID: ${client.id})`)

  broadcast(
    {
      type: 'presence',
      action: 'joined',
      client,
      onlineCount: clients.size,
    },
    socket.id,
  )

  socket.on('set_name', (payload) => {
    if (!payload || typeof payload !== 'object' || typeof payload.name !== 'string') {
      socket.emit('server_event', {
        type: 'error',
        message: 'Name must be a valid string.',
      })
      return
    }

    const name = payload.name.trim()

    if (!name) {
      socket.emit('server_event', {
        type: 'error',
        message: 'Name cannot be empty.',
      })
      return
    }

    client.name = name
    socket.emit('server_event', { type: 'profile', client })
    broadcast({
      type: 'presence',
      action: 'updated',
      client,
      onlineCount: clients.size,
    }, socket.id)
  })

  socket.on('chat_message', (payload) => {
    if (!payload || typeof payload !== 'object' || typeof payload.text !== 'string') {
      socket.emit('server_event', {
        type: 'error',
        message: 'Message text must be a valid string.',
      })
      return
    }

    const text = payload.text.trim()

    if (!text) {
      return
    }

    const message = {
      type: 'chat_message',
      text,
      client,
      sentAt: new Date().toISOString(),
    }

    broadcast(message, socket.id)

    socket.emit('server_event', message)
  })

  socket.on('disconnect', () => {
    clients.delete(socket)

    broadcast({
      type: 'presence',
      action: 'left',
      client,
      onlineCount: clients.size,
    })

    console.log(`Client disconnected: ${client.name} (ID: ${client.id})`)
  })
})

server.listen(port, host, () => {
  console.log(`Socket.IO server listening on http://${host}:${port}`)
})