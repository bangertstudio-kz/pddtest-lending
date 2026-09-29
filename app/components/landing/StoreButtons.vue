<script setup lang="ts">
import { storeLinks } from '~/data/landing'

// Dark badges on the page ground; [light] ones on the blue closing banner.
defineProps<{ light?: boolean }>()
</script>

<template>
  <div class="stores">
    <a :href="storeLinks.appStore" class="store" :class="{ light }">
      <span class="over">Загрузите в</span><span class="name">App Store</span>
    </a>
    <a :href="storeLinks.googlePlay" class="store" :class="{ light }">
      <span class="over">Доступно в</span><span class="name">Google Play</span>
    </a>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.store {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 180px;
  padding: 12px 18px;
  background: var(--ink);
  color: #fff;
  text-decoration: none;
  transition: background 0.15s;
}
.store:hover {
  background: #444141;
  color: #fff;
}
.store.light {
  background: #fff;
  color: var(--ink);
}
.store.light:hover {
  background: #eae9e9;
  color: var(--ink);
}
.over {
  font-size: 11px;
}
.name {
  font-size: 18px;
  font-weight: 800;
}
</style>
