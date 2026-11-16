<script setup lang="ts">
const { data: c } = await useCatalog()

const stats = computed(() => {
  if (!c.value) return []
  const only = c.value.countries.length === 1 ? c.value.countries[0] : undefined
  return [
    { value: formatNumber(c.value.questions), label: plural(c.value.questions, ['вопрос', 'вопроса', 'вопросов']) + ' из билетов' },
    { value: String(c.value.topics), label: plural(c.value.topics, ['тема', 'темы', 'тем']) + ' по разделам ПДД' },
    only
      ? { value: `${only.examQuestions} мин`, label: `экзамен · до ${only.maxWrong} ${plural(only.maxWrong, ['ошибки', 'ошибок', 'ошибок'])}` }
      : { value: String(c.value.countries.length), label: 'страны' },
    { value: `${c.value.trialDays} ${plural(c.value.trialDays, ['день', 'дня', 'дней'])}`, label: 'Премиум бесплатно' },
  ].filter((s) => !s.value.startsWith('0'))
})
</script>

<template>
  <section v-if="c" class="hero">
    <div class="glow" aria-hidden="true" />
    <div class="wrap grid">
      <div class="copy">
        <h1>Сдай ПДД <em>с первого раза</em></h1>
        <p class="lead">
          Билеты по темам, экзамен с таймером как на настоящем и объяснение к каждому вопросу. Приложение покажет, когда
          ты готов.
        </p>
        <LandingStoreButtons />
      </div>
      <div class="visual">
        <PhoneFrame screen="home" :width="290" class="front" />
        <PhoneFrame screen="explain" :width="250" class="back" />
      </div>
    </div>
    <div class="wrap">
      <dl class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <dt>{{ s.value }}</dt>
          <dd>{{ s.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(48px, 7vw, 96px) 0 clamp(56px, 7vw, 96px);
}
.glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--acc) 35%, transparent), transparent 65%);
  pointer-events: none;
}
.grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: center;
  gap: 48px;
}
.copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
}
h1 {
  font-size: clamp(34px, 4.2vw, 56px);
  font-weight: 800;
}
h1 em {
  display: block;
  color: var(--acc);
  font-style: normal;
}
.lead {
  max-width: 520px;
  color: var(--mut);
  font-size: 19px;
}
.visual {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.front {
  position: relative;
  z-index: 2;
}
.back {
  position: relative;
  z-index: 1;
  margin: 72px 0 0 -48px;
  transform: rotate(5deg);
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: clamp(56px, 7vw, 88px) 0 0;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--card);
}
.stat {
  padding: 28px;
}
.stat + .stat {
  border-left: 1px solid var(--line);
}
dt {
  font-family: var(--mono);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 700;
  color: var(--ink);
}
dd {
  margin: 4px 0 0;
  color: var(--mut);
  font-size: 14px;
}
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .back {
    display: none;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }
}
</style>
