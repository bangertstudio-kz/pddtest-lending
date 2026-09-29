<script setup lang="ts">
import { nav } from '~/data/landing'
</script>

<template>
  <header class="header">
    <a href="#" class="brand" aria-label="ПДД тесты — наверх">
      <span class="mark">ПДД</span><span class="name">ПДД тесты</span>
    </a>
    <nav class="nav" aria-label="Разделы">
      <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>
    <a href="#download" class="cta">Скачать →</a>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px var(--gutter);
  border-bottom: 2px solid var(--ink);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  text-decoration: none;
}
.mark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background: var(--acc);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
}
.name {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  font-weight: 600;
}
.nav a {
  color: var(--ink);
  text-decoration: none;
}
.nav a:hover {
  color: var(--acc);
}
.cta {
  padding: 10px 16px;
  background: var(--acc);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
}
.cta:hover {
  background: var(--acc-hover);
  color: #fff;
}
</style>
