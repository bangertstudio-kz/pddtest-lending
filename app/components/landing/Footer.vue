<script setup lang="ts">
import { contactEmail } from '~/data/landing'
</script>

<template>
  <footer class="footer">
    <div class="wrap bar">
      <NuxtLink to="/" class="logo">
        <img src="/icon.png" alt="" width="28" height="28" />
        <span>ПДД Тесты</span>
      </NuxtLink>
      <nav class="links" aria-label="Документы">
        <NuxtLink to="/offer">Договор оферты</NuxtLink>
        <NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink>
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      </nav>
      <span class="copy">© 2026 Bangert Studio</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
}
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px 40px;
  padding-top: 40px;
  padding-bottom: 40px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-family: var(--display);
  font-weight: 700;
  text-decoration: none;
}
.logo img {
  border-radius: 7px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.links a {
  color: var(--mut);
  font-size: 14px;
  text-decoration: none;
}
.links a:hover {
  color: var(--ink);
}
.copy {
  margin-left: auto;
  color: var(--mut);
  font-size: 14px;
}
</style>
