<template>
  <section id="download" class="section">
    <div class="wrap">
      <div class="cta">
        <div class="copy">
          <h2>Экзамен скоро? Начни сегодня.</h2>
          <p>Скачай приложение и реши первый билет за пять минут.</p>
          <LandingStoreButtons />
        </div>
        <PhoneFrame screen="stats" :width="240" class="phone" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  overflow: hidden;
  padding: clamp(40px, 6vw, 72px);
  border-radius: 28px;
  background:
    radial-gradient(circle at 85% 20%, color-mix(in srgb, #fff 18%, transparent), transparent 50%),
    var(--acc);
}
.copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 560px;
}
h2 {
  font-size: clamp(30px, 4vw, 52px);
  color: #fff;
}
p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
}
.phone {
  margin-bottom: calc(-1 * clamp(40px, 6vw, 72px) - 120px);
  transform: rotate(-6deg);
}
@media (max-width: 860px) {
  .phone {
    display: none;
  }
}
</style>
