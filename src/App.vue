<script setup lang="ts">
const users = [
  { id: 1, name: 'Olivia', status: 'online' },
  { id: 2, name: 'Mateo', status: 'away' },
  { id: 3, name: 'Nina', status: 'online' },
  { id: 4, name: 'Jonas', status: 'offline' }
]

const messages = [
  {
    id: 1,
    author: 'Olivia',
    text: 'Hey team, are we ready for today\'s deployment?',
    time: '09:42'
  },
  {
    id: 2,
    author: 'You',
    text: 'Almost. I am finishing the final smoke test now.',
    time: '09:44',
    own: true
  },
  {
    id: 3,
    author: 'Nina',
    text: 'Awesome, I can monitor logs once it is live.',
    time: '09:45'
  }
]
</script>

<template>
  <main class="chat-shell">
    <aside class="users-panel" aria-label="Users list">
      <div class="users-header">
        <h2>Users</h2>
        <span class="online-pill">{{ users.length }}</span>
      </div>

      <ul class="users-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <span class="status-dot" :class="`is-${user.status}`" aria-hidden="true"></span>
          <span class="user-name">{{ user.name }}</span>
        </li>
      </ul>
    </aside>

    <section class="chat-panel" aria-label="Chat window">
      <header class="chat-header">
        <h1>Team Chat</h1>
      </header>

      <div class="messages" aria-live="polite">
        <article v-for="message in messages" :key="message.id" class="message" :class="{ own: message.own }">
          <p class="author">{{ message.author }}</p>
          <p class="bubble">{{ message.text }}</p>
          <time class="time">{{ message.time }}</time>
        </article>
      </div>

      <form class="composer" @submit.prevent>
        <label for="message-input" class="sr-only">Type a message</label>
        <input id="message-input" type="text" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.chat-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100svh;
  text-align: left;
}

.users-panel {
  border-right: 1px solid var(--border);
  padding: 24px 18px;
  background: linear-gradient(180deg, var(--social-bg), transparent 58%);
}

.users-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.users-header h2 {
  margin: 0;
  font-size: 20px;
}

.online-pill {
  min-width: 30px;
  height: 30px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-bg);
}

.users-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #94a3b8;
}

.status-dot.is-online {
  background: #22c55e;
}

.status-dot.is-away {
  background: #f59e0b;
}

.status-dot.is-offline {
  background: #94a3b8;
}

.user-name {
  color: var(--text-h);
  font-weight: 500;
}

.chat-panel {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100svh;
}

.chat-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.chat-header h1 {
  margin: 0;
  font-size: 28px;
}

.messages {
  padding: 24px;
  overflow-y: auto;
  display: grid;
  align-content: start;
  gap: 14px;
}

.message {
  max-width: min(80%, 620px);
}

.message.own {
  margin-left: auto;
  text-align: right;
}

.author {
  margin: 0 0 5px;
  font-size: 13px;
  color: var(--text);
}

.bubble {
  margin: 0;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  color: var(--text-h);
  background: var(--bg);
}

.message.own .bubble {
  background: var(--accent-bg);
  border-color: var(--accent-border);
}

.time {
  display: inline-block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--text);
}

.composer {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
}

.composer input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font: inherit;
  color: var(--text-h);
  background: var(--bg);
}

.composer button {
  border: 1px solid var(--accent-border);
  border-radius: 12px;
  padding: 12px 20px;
  font: inherit;
  font-weight: 600;
  color: var(--text-h);
  background: var(--accent-bg);
  cursor: pointer;
}

.composer button:hover {
  filter: brightness(1.02);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .chat-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .users-panel {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 16px;
  }

  .users-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chat-panel,
  .chat-shell {
    min-height: auto;
  }
}

@media (max-width: 560px) {
  .users-list {
    grid-template-columns: 1fr;
  }

  .chat-header {
    padding: 16px;
  }

  .messages {
    padding: 16px;
  }

  .composer {
    padding: 12px 16px 16px;
    grid-template-columns: 1fr;
  }
}
</style>
