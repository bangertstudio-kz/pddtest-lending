<template>
  <section class="cta">
    <h2>Экзамен через месяц? Начни сегодня.</h2>
    <LandingStoreButtons light />
  </section>
</template>

<style scoped>
.cta {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: clamp(56px, 8vw, 112px) var(--gutter);
  background: var(--acc);
  color: #fff;
}
h2 {
  max-width: 1100px;
  font-size: clamp(44px, 8vw, 120px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
</style>
