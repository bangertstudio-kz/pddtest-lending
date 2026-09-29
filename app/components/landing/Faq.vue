<script setup lang="ts">
import { faq } from '~/data/landing'
</script>

<template>
  <section id="faq" class="section">
    <div class="head"><h2>Вопросы</h2></div>
    <!-- Native accordion: `name` keeps one answer open at a time, no JS. -->
    <details v-for="(item, i) in faq" :key="item.q" name="faq" :open="i === 0">
      <summary>
        <span>{{ item.q }}</span><span class="sign" aria-hidden="true" />
      </summary>
      <p>{{ item.a }}</p>
    </details>
  </section>
</template>

<style scoped>
.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px, 8vw, 112px) var(--gutter);
}
.head {
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ink);
}
h2 {
  font-size: clamp(32px, 4vw, 52px);
  letter-spacing: -0.025em;
  line-height: 1.1;
}
details {
  border-bottom: 1px solid var(--div);
}
summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  font-size: clamp(17px, 1.6vw, 20px);
  font-weight: 800;
  list-style: none;
  cursor: pointer;
}
summary::-webkit-details-marker {
  display: none;
}
summary:hover {
  color: var(--acc);
}
.sign::after {
  content: '+';
  color: var(--acc);
  font-size: 22px;
}
details[open] .sign::after {
  content: '−';
}
p {
  max-width: 720px;
  margin: 0 0 20px;
  color: var(--mut);
  font-size: 16px;
  line-height: 1.5;
  text-wrap: pretty;
}
</style>
