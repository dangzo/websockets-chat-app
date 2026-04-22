<template>
  <main class="chat-shell">
    <slot name="sidebar" />
    <slot name="main" />
  </main>
</template>

<style scoped lang="scss">
.chat-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100svh;
  text-align: left;
}

@media (max-width: 900px) {
  .chat-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>
