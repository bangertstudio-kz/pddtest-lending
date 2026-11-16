<script setup lang="ts">
import { soonCountries } from '~/data/landing'

const { data: catalog } = await useCatalog()
const countries = computed(() => catalog.value?.countries ?? [])
const regions = new Intl.DisplayNames(['ru'], { type: 'region' })
const soon = computed(() =>
  soonCountries.filter((code) => !countries.value.some((c) => c.code === code)).map((code) => regions.of(code) ?? code),
)

// The panel is the app's onboarding: pick a country, then a category.
const picked = ref(0)
const category = ref(0)
const country = computed(() => countries.value[picked.value])
function pick(i: number) {
  picked.value = i
  category.value = 0
}
</script>

<template>
  <section v-if="country" id="countries" class="section">
    <div class="wrap grid">
      <div class="copy">
        <LandingSectionHead title="Две минуты на настройку" />
        <ol class="steps">
          <li>
            <span class="n">01</span>
            <div><h3>Выбери страну</h3><p>Билеты и правила экзамена — те, по которым сдают именно там.</p></div>
          </li>
          <li>
            <span class="n">02</span>
            <div><h3>Выбери категорию</h3><p>Только вопросы твоих прав. Общие засчитываются во все категории.</p></div>
          </li>
          <li>
            <span class="n">03</span>
            <div>
              <h3>Решай первый билет</h3>
              <p>Столько вопросов, времени и ошибок, сколько даёт экзамен в твоей стране.</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="panel">
        <span class="label">Где сдаёшь</span>
        <div class="chips">
          <button
            v-for="(c, i) in countries"
            :key="c.code"
            type="button"
            class="chip"
            :class="{ on: i === picked }"
            :aria-pressed="i === picked"
            @click="pick(i)"
          >
            {{ c.name }}
          </button>
          <span v-for="name in soon" :key="name" class="chip soon">{{ name }} <small>скоро</small></span>
        </div>
        <span class="label">Категория</span>
        <div class="options" role="radiogroup" aria-label="Категория">
          <button
            v-for="(k, i) in country.categories"
            :key="k.code"
            type="button"
            role="radio"
            class="option"
            :class="{ on: i === category }"
            :aria-checked="i === category"
            @click="category = i"
          >
            <span class="code">{{ k.code }}</span>
            <span class="text"><b>{{ k.name }}</b><small>{{ k.description }}</small></span>
            <span class="radio" />
          </button>
        </div>
        <div class="strip">
          <span><b>{{ country.examQuestions }}</b> {{ plural(country.examQuestions, ['вопрос', 'вопроса', 'вопросов']) }}</span>
          <span><b>{{ country.examQuestions }}</b> минут</span>
          <span>до <b>{{ country.maxWrong }}</b> {{ plural(country.maxWrong, ['ошибки', 'ошибок', 'ошибок']) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
}
.steps {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.steps li {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
}
.n {
  color: var(--acc);
  font-family: var(--mono);
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.steps h3 {
  margin-bottom: 6px;
  font-size: 18px;
}
.steps p {
  color: var(--mut);
}
.panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: linear-gradient(180deg, var(--card-2), var(--card));
}
.label {
  color: var(--mut);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  padding: 10px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: none;
  color: var(--mut);
  font: inherit;
  font-size: 15px;
  cursor: pointer;
}
.chip.on {
  border-color: var(--acc);
  background: var(--acc);
  color: var(--on-acc);
  font-weight: 600;
}
.chip.soon {
  border-style: dashed;
  cursor: default;
  opacity: 0.75;
}
.chip small {
  margin-left: 4px;
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option {
  display: grid;
  grid-template-columns: 64px 1fr 22px;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--card);
  color: var(--ink);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.option.on {
  border-color: var(--acc);
  box-shadow: 0 0 0 1px var(--acc) inset;
}
.code {
  color: var(--acc);
  font-family: var(--mono);
  font-size: 22px;
  font-weight: 700;
}
.text {
  display: flex;
  flex-direction: column;
}
.text b {
  font-weight: 600;
}
.text small {
  color: var(--mut);
  font-size: 13px;
}
.radio {
  width: 22px;
  height: 22px;
  border: 2px solid var(--line);
  border-radius: 50%;
}
.option.on .radio {
  border: 6px solid var(--acc);
}
.strip {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 20px;
  border-radius: 16px;
  background: var(--bg);
  color: var(--mut);
  font-family: var(--mono);
  font-size: 14px;
}
.strip b {
  color: var(--ink);
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
