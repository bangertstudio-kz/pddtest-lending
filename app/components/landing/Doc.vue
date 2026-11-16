<script setup lang="ts">
const props = defineProps<{ title: string; updated: string }>()

useHead({ title: `${props.title} - ПДД тесты` })
</script>

<template>
  <div>
    <header class="header">
      <NuxtLink to="/" class="back">← ПДД тесты</NuxtLink>
    </header>
    <main class="doc">
      <h1>{{ title }}</h1>
      <p class="updated">Редакция от {{ updated }}</p>
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>

<style scoped>
.header {
  padding: 18px var(--gutter);
  border-bottom: 2px solid var(--ink);
}
.back {
  color: var(--ink);
  font-weight: 800;
  text-decoration: none;
}
.back:hover {
  color: var(--acc);
}
.doc {
  max-width: 760px;
  padding: 56px var(--gutter) 80px;
}
h1 {
  font-size: clamp(32px, 4vw, 52px);
  letter-spacing: -0.025em;
  line-height: 1.1;
}
.updated {
  margin-top: 12px;
  color: var(--mut);
  font-size: 14px;
}
.doc :deep(h2) {
  margin-top: 40px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--ink);
  font-size: 20px;
}
.doc :deep(p),
.doc :deep(ul) {
  margin-top: 12px;
}
.doc :deep(ul) {
  padding-left: 20px;
}
</style>
