<script setup lang="ts">
import { nav } from '~/data/landing'

</script>

<template>
  <header class="header">
    <div class="wrap bar">
      <NuxtLink to="/" class="logo">
        <img src="/icon.png" alt="" width="36" height="36" />
        <span>ПДД Тесты</span>
      </NuxtLink>
      <nav class="nav" aria-label="Разделы">
        <a v-for="n in nav" :key="n.href" :href="n.href">{{ n.label }}</a>
      </nav>
      <!-- The web app: the same account as on the phone. -->
      <a href="https://app.pddtest.bangertstudio.kz" class="signin">Войти</a>
      <a href="#download" class="btn small">Скачать</a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(16px);
}
.bar {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 72px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-family: var(--display);
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
}
.logo img {
  border-radius: 9px;
}
.nav {
  display: flex;
  gap: 32px;
  margin-left: auto;
}
.nav a {
  color: var(--mut);
  font-size: 15px;
  text-decoration: none;
  transition: color 0.2s;
}
.nav a:hover {
  color: var(--ink);
}
.signin {
  margin-right: -16px;
  padding: 10px 4px;
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.signin:hover {
  color: var(--acc);
}
.small {
  padding: 10px 20px;
  font-size: 15px;
}
@media (max-width: 760px) {
  .nav {
    display: none;
  }
  .signin {
    margin-left: auto;
  }
}
</style>
