<script setup lang="ts">
import { planNotes, popularPlan } from '~/data/landing'

const { data: c } = await useCatalog()

const topicsWord = (n: number) => plural(n, ['тема', 'темы', 'тем'])

/** What each tier has, as the app gates it: Premium opens every topic and
 * reviewing mistakes; the exam, explanations and stats are free. */
const features = computed(() => {
  const free = c.value?.freeTopics ?? 0
  const all = c.value?.topics ?? 0
  return [
    { free: `${free} ${topicsWord(free)} из ${all}`, premium: `Все ${all} ${topicsWord(all)}`, inFree: true },
    { free: 'Режим экзамена', premium: 'Режим экзамена', inFree: true },
    { free: 'Объяснения к ответам', premium: 'Объяснения к ответам', inFree: true },
    { free: 'Статистика и готовность', premium: 'Статистика и готовность', inFree: true },
    { free: 'Работа над ошибками', premium: 'Работа над ошибками', inFree: false },
  ]
})

const cards = computed(() => {
  if (!c.value) return []
  const days = (n: number) => `${n} ${plural(n, ['день', 'дня', 'дней'])}`
  return [
    {
      key: 'free',
      name: 'Бесплатно',
      price: c.value.free,
      per: 'навсегда',
      badges: [] as { text: string; acc?: boolean }[],
      premium: false,
      popular: false,
      note: '',
      cta: 'Скачать',
    },
    ...c.value.plans.map((p) => {
      const popular = p.code === popularPlan
      const badges: { text: string; acc?: boolean }[] = []
      if (popular) badges.push({ text: 'Популярный', acc: true })
      else if (p.discount > 0) badges.push({ text: `−${p.discount}%` })
      if (p.trialDays) badges.push({ text: `${days(p.trialDays)} бесплатно` })
      return {
        key: p.code,
        name: p.name,
        price: p.price,
        per: popular && p.discount > 0 ? `${p.perMonth} · −${p.discount}%` : p.perMonth,
        badges,
        premium: true,
        popular,
        note: planNotes[p.code] ?? '',
        cta: popular && p.trialDays ? `${days(p.trialDays)} бесплатно` : 'Выбрать',
      }
    }),
  ]
})
</script>

<template>
  <section v-if="c" id="pricing" class="section">
    <div class="wrap">
      <LandingSectionHead title="Начни бесплатно" lead="Премиум — когда захочешь все темы и разбор ошибок." />
      <div class="grid">
        <article v-for="card in cards" :key="card.key" class="plan" :class="{ popular: card.popular }">
          <div class="badges">
            <span v-for="b in card.badges" :key="b.text" class="badge" :class="{ acc: b.acc }">{{ b.text }}</span>
          </div>
          <span class="name">{{ card.name }}</span>
          <span class="price">{{ card.price }}</span>
          <span class="per">{{ card.per }}</span>
          <ul>
            <li
              v-for="f in features"
              :key="f.premium"
              :class="{ off: !card.premium && !f.inFree }"
            >
              <LandingIcon :name="card.premium || f.inFree ? 'check' : 'x'" :size="18" />
              {{ card.premium ? f.premium : f.free }}
            </li>
          </ul>
          <span v-if="card.note" class="note">{{ card.note }}</span>
          <a href="#download" class="btn" :class="{ ghost: !card.popular }">{{ card.cta }}</a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: end;
}
.plan {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px 24px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--card);
}
.plan.popular {
  padding-top: 44px;
  padding-bottom: 36px;
  border-color: var(--acc);
  background: linear-gradient(180deg, color-mix(in srgb, var(--acc) 22%, var(--card)), var(--card) 70%);
  box-shadow: 0 30px 60px -30px color-mix(in srgb, var(--acc) 60%, transparent);
}
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 24px;
}
.badge {
  padding: 4px 9px;
  border-radius: 7px;
  background: var(--card-2);
  color: var(--mut);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.4;
  text-transform: uppercase;
}
.badge.acc {
  background: var(--acc);
  color: var(--on-acc);
}
.name {
  font-family: var(--display);
  font-size: 19px;
  font-weight: 700;
}
.price {
  font-family: var(--mono);
  font-size: 34px;
  font-weight: 700;
  line-height: 1.1;
}
.popular .price {
  color: var(--acc);
}
.per {
  color: var(--mut);
  font-family: var(--mono);
  font-size: 13px;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px 0 0;
  padding: 16px 0 0;
  border-top: 1px solid var(--line);
  list-style: none;
  font-size: 14px;
}
li {
  display: flex;
  gap: 8px;
  align-items: center;
}
li svg {
  flex: none;
  color: var(--acc);
}
li.off {
  color: var(--mut);
  text-decoration: line-through;
  text-decoration-color: rgba(255, 255, 255, 0.25);
}
li.off svg {
  color: var(--mut);
}
.note {
  margin-top: 8px;
  color: var(--mut);
  font-size: 13px;
}
.btn {
  justify-content: center;
  margin-top: 18px;
  white-space: nowrap;
}
.btn.ghost {
  background: transparent;
  box-shadow: 0 0 0 1px var(--line) inset;
  color: var(--ink);
}
.btn.ghost:hover {
  box-shadow: 0 0 0 1px var(--acc) inset;
}
@media (max-width: 1080px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }
}
@media (max-width: 620px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
