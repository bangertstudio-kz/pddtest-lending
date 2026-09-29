<script setup lang="ts">
import { features } from '~/data/landing'
</script>

<template>
  <section id="features" class="section">
    <LandingSectionHead title="Как это работает" note="Четыре режима — один путь к экзамену" />
    <article v-for="f in features" :key="f.n" class="feature">
      <div class="copy">
        <div class="n">{{ f.n }}</div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
        <ul>
          <li v-for="p in f.points" :key="p">{{ p }}</li>
        </ul>
      </div>
      <PhoneFrame :height="600" class="phone"><PhoneAppScreen :screen="f.screen" /></PhoneFrame>
    </article>
  </section>
</template>

<style scoped>
.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px, 8vw, 112px) var(--gutter) 0;
  scroll-margin-top: 0;
}
.feature {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  align-items: center;
  gap: 40px;
  padding: 48px 0;
  border-bottom: 1px solid var(--div);
}
.copy {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.n {
  color: var(--acc);
  font-size: 13px;
  font-weight: 800;
}
h3 {
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
p {
  max-width: 480px;
  color: var(--mut);
  font-size: 17px;
  line-height: 1.5;
  text-wrap: pretty;
}
ul {
  max-width: 480px;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--div);
}
li {
  padding: 10px 0;
  border-bottom: 1px solid var(--div);
  font-size: 15px;
  font-weight: 600;
}
.phone {
  background: #201e1d;
}
</style>
