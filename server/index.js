import { createServer } from 'node:http'
import { WebSocketServer, WebSocket } from 'ws'

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

const wss = new WebSocketServer({ server })
const clients = new Map()
let nextClientId = 1

function broadcast(payload, excludedClient) {
  const message = JSON.stringify(payload)

  for (const client of wss.clients) {
    if (client !== excludedClient && client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  }
}

wss.on('connection', (socket) => {
  const clientId = nextClientId
  nextClientId += 1

  const client = {
    id: clientId,
    name: `User ${clientId}`,
  }

  clients.set(socket, client)

  socket.send(
    JSON.stringify({
      type: 'welcome',
      client,
      onlineCount: clients.size,
    }),
  )

  broadcast(
    {
      type: 'presence',
      action: 'joined',
      client,
      onlineCount: clients.size,
    },
    socket,
  )

  socket.on('message', (rawMessage) => {
    let payload

    try {
      payload = JSON.parse(rawMessage.toString())
    } catch {
      socket.send(
        JSON.stringify({
          type: 'error',
          message: 'Messages must be valid JSON.',
        }),
      )
      return
    }

    if (payload.type === 'set_name' && typeof payload.name === 'string') {
      const name = payload.name.trim()

      if (!name) {
        socket.send(
          JSON.stringify({
            type: 'error',
            message: 'Name cannot be empty.',
          }),
        )
        return
      }

      client.name = name
      socket.send(JSON.stringify({ type: 'profile', client }))
      return
    }

    if (payload.type === 'chat_message' && typeof payload.text === 'string') {
      const text = payload.text.trim()

      if (!text) {
        return
      }

      broadcast({
        type: 'chat_message',
        text,
        client,
        sentAt: new Date().toISOString(),
      })
      return
    }

    socket.send(
      JSON.stringify({
        type: 'error',
        message: 'Unsupported message type.',
      }),
    )
  })

  socket.on('close', () => {
    clients.delete(socket)

    broadcast({
      type: 'presence',
      action: 'left',
      client,
      onlineCount: clients.size,
    })
  })
})

server.listen(port, host, () => {
  console.log(`WebSocket server listening on http://${host}:${port}`)
})