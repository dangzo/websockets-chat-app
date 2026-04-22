<template>
  <span class="online-pill"><slot /></span>
</template>

<style scoped lang="scss">
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
</style>
  