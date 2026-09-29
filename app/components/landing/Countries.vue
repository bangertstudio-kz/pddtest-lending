<script setup lang="ts">
import { countries } from '~/data/landing'
</script>

<template>
  <section id="countries" class="section">
    <LandingSectionHead
      title="Твоя страна, твоя категория"
      note="Общие вопросы засчитываются во все категории"
    />
    <div class="grid">
      <div v-for="c in countries" :key="c.code" class="country">
        <span class="code">{{ c.code }}</span>
        <span class="name">{{ c.name }}</span>
        <span class="rule">{{ c.rule }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px, 8vw, 112px) var(--gutter) 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  border-left: 1px solid var(--div);
}
.country {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 20px;
  border-right: 1px solid var(--div);
  border-bottom: 1px solid var(--div);
}
.code {
  color: var(--acc);
  font-size: 13px;
  font-weight: 800;
}
.name {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.rule {
  color: var(--mut);
  font-size: 14px;
}
</style>
