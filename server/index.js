import { createServer } from 'node:http'
import { Server } from 'socket.io'
import express from 'express'

const port = Number(process.env.PORT ?? 3001)
const host = process.env.WS_HOST ?? '0.0.0.0'

const app = express()

const server = createServer(app)

const io = new Server(server, {
  path: '/ws',
  transports: ['websocket'],
})

const clients = new Map()
let nextClientId = 1

// Broadcast a message to all clients, optionally excluding one socket ID (e.g. the sender)
function broadcast(payload, excludedSocketId) {
  if (excludedSocketId) {
    io.except(excludedSocketId).emit('server_event', payload)
    return
  }

  io.emit('server_event', payload)
}

// Main entry point: returns server status and WebSocket URL
app.get('/', (request, response) => {
  response.json({
    status: 'ok',
    websocket: `ws://${request.headers.host ?? `localhost:${port}`}`,
  })
})


// WebSocket connection handler
io.on('connection', (socket) => {
  // Assigns a unique client ID and default name
  const clientId = nextClientId
  nextClientId += 1

  const client = {
    id: clientId,
    name: `User ${clientId}`,
  }

  clients.set(socket, client)

  // Notifies the new client of their profile
  socket.emit('server_event', {
    type: 'welcome',
    client,
    clients: Array.from(clients.values()),
    onlineCount: clients.size,
  })

  console.log(`Client connected: ${client.name} (ID: ${client.id})`)

  // Broadcasts presence updates to all other clients
  broadcast(
    {
      type: 'presence',
      action: 'joined',
      client,
      onlineCount: clients.size,
    },
    socket.id,
  )

  // Handles name changes
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

  // Handles incoming messages
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

  // Cleans up on disconnect
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

// Start the server
server.listen(port, host, () => {
  console.log(`WebSocket server listening on http://${host}:${port}`)
})