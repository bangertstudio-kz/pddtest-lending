<script setup lang="ts">
defineProps<{ title: string; lead?: string }>()
</script>

<template>
  <div class="head">
    <span class="line" />
    <h2>{{ title }}</h2>
    <p v-if="lead" class="lead">{{ lead }}</p>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 760px;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.line {
  width: 64px;
  height: 2px;
  background: var(--acc);
}
h2 {
  font-size: clamp(32px, 4.4vw, 56px);
}
.lead {
  color: var(--mut);
  font-size: 18px;
}
</style>
