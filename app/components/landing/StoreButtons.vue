<script setup lang="ts">
import { storeLinks } from '~/data/landing'
</script>

<template>
  <div class="stores">
    <a :href="storeLinks.appStore" target="_blank" rel="noopener" class="store">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z"
        />
      </svg>
      <span><small>Загрузите в</small>App Store</span>
    </a>
    <a :href="storeLinks.googlePlay" target="_blank" rel="noopener" class="store">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M4 2.5v19l10-9.5L4 2.5zm11.3 10.7 2.7 2.6-11.6 6.6 8.9-9.2zm0-2.4L6.4 1.6 18 8.2l-2.7 2.6zm3.9 3.8 2.6-1.5c.8-.5.8-1.6 0-2.1l-2.6-1.5-2.9 2.6 2.9 2.5z"
        />
      </svg>
      <span><small>Доступно в</small>Google Play</span>
    </a>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.store {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 176px;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: #000;
  color: #fff;
  text-decoration: none;
  transition: border-color 0.2s;
}
.store:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}
.store span {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.15;
}
.store small {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.75;
}
</style>
