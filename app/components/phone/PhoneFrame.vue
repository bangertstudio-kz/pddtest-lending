<script setup lang="ts">
// An iPhone with a real screen of the app: the store screenshots' raw frames
// in `public/screens` (light theme, status bar left blank - drawn here).
import type { Screen } from '~/data/landing'

defineProps<{ screen: Screen; width?: number }>()
</script>

<template>
  <div class="phone" :style="{ '--w': `${width ?? 300}px` }" aria-hidden="true">
    <div class="screen">
      <img :src="`/screens/${screen}.jpg`" alt="" loading="lazy" />
      <div class="status">
        <span>9:41</span>
        <span class="island" />
        <svg width="54" height="12" viewBox="0 0 54 12" fill="currentColor">
          <rect x="0" y="7.5" width="3" height="4.5" rx="0.7" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.7" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.7" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.7" />
          <rect x="27" y="0.5" width="23" height="11" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.4" />
          <rect x="28.5" y="2" width="20" height="8" rx="1.8" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  flex: none;
  width: var(--w);
  padding: calc(var(--w) * 0.035);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: calc(var(--w) * 0.16);
  background: #050608;
  box-shadow:
    0 40px 80px -20px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(0, 0, 0, 0.6) inset;
}
.screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1320 / 2868;
  border-radius: calc(var(--w) * 0.13);
  background: #fff;
}
.screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.status {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--w) * 0.13);
  padding: 0 calc(var(--w) * 0.08) 0 calc(var(--w) * 0.1);
  color: #111;
  font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
  font-size: calc(var(--w) * 0.048);
  font-weight: 600;
}
.status svg {
  width: calc(var(--w) * 0.17);
  height: auto;
}
.island {
  position: absolute;
  left: 50%;
  top: calc(var(--w) * 0.03);
  width: calc(var(--w) * 0.3);
  height: calc(var(--w) * 0.088);
  border-radius: 999px;
  background: #000;
  transform: translateX(-50%);
}
</style>
