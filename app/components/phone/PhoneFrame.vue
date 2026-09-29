<script setup lang="ts">
// The design's iOS device (402 × 874, dark), scaled to 0.75 and cropped to
// [height] — the landing shows the top of each screen only.
withDefaults(defineProps<{ height?: number }>(), { height: 560 })
</script>

<template>
  <div class="frame" :style="{ height: `${height}px` }" aria-hidden="true">
    <div class="device">
      <div class="island" />
      <div class="status">
        <span class="half"><span class="time">9:41</span></span>
        <span class="half icons">
          <svg width="19" height="12" viewBox="0 0 19 12">
            <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" />
            <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" />
            <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" />
            <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" />
          </svg>
          <svg width="17" height="12" viewBox="0 0 17 12">
            <path
              d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z"
            />
            <path
              d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z"
            />
            <circle cx="8.5" cy="10.5" r="1.5" />
          </svg>
          <svg width="27" height="13" viewBox="0 0 27 13">
            <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity="0.35" />
            <rect x="2" y="2" width="20" height="9" rx="2" />
            <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill-opacity="0.4" />
          </svg>
        </span>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.frame {
  flex: none;
  width: 302px; /* 402 × 0.75 */
  overflow: hidden;
  border-radius: 36px 36px 0 0; /* 48 × 0.75 */
}

.device {
  position: relative;
  width: 402px;
  height: 874px;
  overflow: hidden;
  border-radius: 48px;
  background: #000;
  transform: scale(0.75);
  transform-origin: top left;
}

.island {
  position: absolute;
  top: 11px;
  left: 50%;
  z-index: 50;
  width: 126px;
  height: 37px;
  border-radius: 24px;
  background: #000;
  transform: translateX(-50%);
}

.status {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  display: flex;
  gap: 154px; /* the island sits between the halves */
  align-items: center;
  padding: 21px 24px 19px;
  color: #fff;
  fill: #fff;
}

.half {
  flex: 1;
  display: flex;
  justify-content: center;
}

.time {
  font: 590 17px/22px -apple-system, 'SF Pro', system-ui, sans-serif;
}

.icons {
  display: flex;
  align-items: center;
  gap: 7px;
}
</style>
