<script setup lang="ts">
import { contactEmail } from '~/data/landing'
</script>

<template>
  <footer class="footer">
    <span>© 2026 ПДД тесты</span>
    <nav class="links" aria-label="Документы">
      <a href="#">Условия</a>
      <a href="#">Конфиденциальность</a>
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding: 24px var(--gutter);
  border-top: 2px solid var(--ink);
  color: var(--mut);
  font-size: 13px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.links a {
  color: var(--mut);
}
.links a:hover {
  color: var(--acc);
}
</style>
