# WebSockets Chat App in Vue.js

Side project to learn about WebSockets and real-time communication in web applications.

This chat app allows users to connect and communicate with each other in real-time using WebSockets.

## Features
- Real-time messaging: Users can send and receive messages instantly.
- User connection status: Users can see who is currently online.
- Login screen: Users can enter a username to join the chat.
- Node.js backend: The server is built using Node.js and the `ws` library for handling WebSocket connections.

To see multiple users in action, open the app in multiple browser windows or tabs and log in with different usernames. You will see the messages being exchanged in real-time across all connected clients.

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:dangzo/websockets-chat-app.git
    ```
2. Navigate to the project directory:
   ```bash
   cd websockets-chat-app
   ```
3. Install dependencies for the server:
   ```bash
   yarn install
   ```
4. Start the server:
   ```bash
   yarn run server
   ```
5. Launch the Vue.js frontend:
   ```bash
   yarn run dev
   ```

## Docker Compose

To run only the websocket server in Docker:

```bash
docker-compose up server
```

The compose service builds from the local `Dockerfile`, exposes the server on `http://localhost:3001`, and passes `WS_HOST=0.0.0.0` so the websocket server binds correctly inside the container.

To build the image directly:

```bash
docker build -t websockets-chat-server .
```
