<script setup lang="ts">
import { numbers } from '~/data/landing'
</script>

<template>
  <section class="numbers">
    <div v-for="n in numbers" :key="n.value" class="number">
      <div class="value">{{ n.value }}</div>
      <div class="label">{{ n.label }}</div>
    </div>
  </section>
</template>

<style scoped>
.numbers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
}
.number {
  padding: 28px var(--gutter);
  border-right: 1px solid var(--div);
}
.number:last-child {
  border-right: 0;
}
.value {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}
.label {
  margin-top: 6px;
  color: var(--mut);
  font-size: 14px;
}
</style>
