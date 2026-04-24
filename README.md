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

## GitHub Actions Deployment

The repository includes a GitHub Actions workflow that automatically deploys to an AWS EC2 instance on every push to `main`.

### Setup

To enable automatic deployment, add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **EC2_HOST**: The IP address or hostname of your EC2 instance
2. **EC2_SSH_KEY**: Your EC2 instance SSH private key (without passphrase)
3. **EC2_USER**: The SSH username (e.g., `ubuntu`)

### How it works

The workflow:
1. Checks out your code
2. SSHes into the EC2 instance
3. Pulls the latest code from `main`
4. Runs `docker-compose down` to stop the old container
5. Runs `docker-compose up -d --build` to rebuild and start the new container

Every push to `main` triggers a fresh deployment automatically.
