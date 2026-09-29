<script setup lang="ts">
import { plans } from '~/data/landing'
</script>

<template>
  <section id="pricing" class="section">
    <LandingSectionHead title="Цены" note="7 дней бесплатно на любом тарифе" />
    <div class="grid">
      <div v-for="p in plans" :key="p.name" class="plan" :class="{ highlight: p.highlight }">
        <span class="tag">{{ p.tag }}</span>
        <span class="name">{{ p.name }}</span>
        <span class="price">{{ p.price }}</span>
        <span class="sub">{{ p.per }}</span>
        <span class="sub note">{{ p.note }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px, 8vw, 112px) var(--gutter) 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  border-left: 1px solid var(--div);
}
.plan {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 280px;
  padding: 28px 24px;
  border-right: 1px solid var(--div);
  border-bottom: 1px solid var(--div);
}
.plan.highlight {
  background: var(--acc);
  color: var(--on-acc);
}
.tag {
  min-height: 16px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 800;
}
.name {
  font-size: 22px;
  font-weight: 800;
}
.price {
  font-size: 44px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}
.sub {
  color: var(--mut);
  font-size: 14px;
}
.highlight .sub {
  color: var(--on-acc);
}
.note {
  margin-top: auto;
  text-wrap: pretty;
}
</style>
