<script setup lang="ts">
defineProps<{ title: string; note?: string }>()
</script>

<template>
  <div class="head">
    <h2>{{ title }}</h2>
    <span v-if="note" class="note">{{ note }}</span>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ink);
}
h2 {
  font-size: clamp(32px, 4vw, 52px);
  letter-spacing: -0.025em;
  line-height: 1.1;
}
.note {
  color: var(--mut);
  font-size: 14px;
}
</style>
