<script setup lang="ts">
// The app's screens as the design draws them (PDD App, dark, blue accent),
// frozen in the demo state. Static: the landing only shows them.
import { mistakes, progress, questions, topics, weakCount, type Question, type Screen } from '~/data/demo'

const props = defineProps<{ screen: Screen }>()

const letters = 'АБВГ'
const pct = (n: number) => `${n}%`
const hint = progress.readiness >= 85 ? 'Можно записываться на экзамен.' : `Подтяни ${weakCount} слабых тем`
const weakest = [...topics.entries()].sort(([, a], [, b]) => a[1] - b[1]).slice(0, 3)

// The question screens: training with a wrong answer revealed, and the exam
// twelve questions in with the timer running.
const quiz = computed(() => {
  if (props.screen === 'wrong') {
    return {
      mode: 'Тренировка',
      timer: '',
      cells: Array.from({ length: 10 }, (_, i) => ['ink', 'ink', 'err', 'acc'][i] ?? 'sf'),
      number: 4,
      total: 10,
      q: questions.signal as Question,
      picked: 2,
      revealed: true,
    }
  }
  return {
    mode: 'Экзамен',
    timer: '28:32',
    cells: Array.from({ length: 40 }, (_, i) => (i < 11 ? 'ink' : i === 11 ? 'acc' : 'sf')),
    number: 12,
    total: 40,
    q: questions.speed as Question,
    picked: null as number | null,
    revealed: false,
  }
})

function optionClass(i: number) {
  const { q, picked, revealed } = quiz.value
  if (revealed && i === q.correct) return 'opt ok'
  if (revealed && i === picked) return 'opt bad'
  return 'opt'
}
</script>

<template>
  <div class="app">
    <!-- Главная -->
    <div v-if="screen === 'home'" class="scroll">
      <div class="hero">
        <div class="row between">
          <span class="kicker">Готовность к экзамену</span>
          <span class="kicker">{{ progress.place }}</span>
        </div>
        <div class="row baseline">
          <span class="big">{{ pct(progress.readiness) }}</span>
          <span class="hint">{{ hint }}</span>
        </div>
        <div class="track hero-track"><div class="fill acc" :style="{ width: pct(progress.readiness) }" /></div>
      </div>
      <div class="pad col gap20">
        <div class="ticket">
          <span class="kicker">Режим экзамена</span>
          <span class="row between baseline"><span class="ticket-title">Начать билет</span><span class="arrow">→</span></span>
          <span class="ticket-rule">40 вопросов · 40 минут · 4 ошибки</span>
        </div>
        <div>
          <div class="section row between baseline">
            <span class="section-title">Слабые темы</span><span class="link">Все темы</span>
          </div>
          <div v-for="[i, [name, p]] in weakest" :key="i" class="topic">
            <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="col gap6">
              <span class="topic-name">{{ name }}</span>
              <span class="track thin"><span class="fill err" :style="{ width: pct(p) }" /></span>
            </span>
            <span class="topic-pct err-text">{{ pct(p) }}</span>
          </div>
        </div>
        <div class="grid2">
          <div class="cell"><div class="cell-label">Решено</div><div class="cell-value">{{ progress.solved }}</div></div>
          <div class="cell"><div class="cell-label">Точность</div><div class="cell-value">{{ pct(progress.accuracy) }}</div></div>
        </div>
      </div>
    </div>

    <!-- Темы -->
    <div v-else-if="screen === 'topics'" class="scroll page">
      <span class="kicker acc-text">Тренировка</span>
      <h1 class="title">Темы</h1>
      <div class="row gap8 mb8">
        <span class="btn">Случайные 20 →</span>
        <span class="btn outline">Ошибки · {{ mistakes.length }}</span>
      </div>
      <div class="rule">
        <div v-for="([name, p], i) in topics" :key="name" class="topic tall">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="col gap6">
            <span class="topic-name">{{ name }}</span>
            <span class="track thin"><span class="fill" :class="p < 50 ? 'err' : 'ink'" :style="{ width: pct(p) }" /></span>
          </span>
          <span class="topic-pct" :class="p < 50 ? 'err-text' : ''">{{ pct(p) }}</span>
        </div>
      </div>
    </div>

    <!-- Вопрос: тренировка с разбором и экзамен -->
    <div v-else-if="screen === 'wrong' || screen === 'exam'" class="question">
      <div class="q-head col gap10">
        <div class="row between center">
          <span class="exit">✕ Выйти</span>
          <span class="kicker mut-text">{{ quiz.mode }}</span>
          <span class="timer">{{ quiz.timer }}</span>
        </div>
        <div class="cells">
          <div v-for="(c, i) in quiz.cells" :key="i" class="qcell" :class="c" />
        </div>
        <div class="row between baseline">
          <span class="small mut-text">Вопрос <strong>{{ quiz.number }}</strong> из {{ quiz.total }}</span>
          <span class="tiny mut-text">{{ topics[quiz.q.topic]![0] }}</span>
        </div>
      </div>
      <div class="q-body col gap14">
        <div v-if="quiz.q.image" class="image"><span>[ {{ quiz.q.image }} ]</span></div>
        <div class="q-text">{{ quiz.q.text }}</div>
        <div class="col gap6">
          <div v-for="(o, i) in quiz.q.options" :key="o" :class="optionClass(i)">
            <span class="letter">{{ letters[i] }}</span><span>{{ o }}</span>
          </div>
        </div>
        <div v-if="quiz.revealed" class="explain col gap6">
          <span class="kicker" :class="quiz.picked === quiz.q.correct ? '' : 'err-text'">
            {{ quiz.picked === quiz.q.correct ? 'Верно' : 'Неверно' }}
          </span>
          <div class="explain-text">{{ quiz.q.explain }}</div>
        </div>
      </div>
      <div class="q-foot">
        <span class="btn wide" :class="{ disabled: quiz.picked === null }"><span>Далее</span><span>→</span></span>
      </div>
    </div>

    <!-- Ошибки -->
    <div v-else-if="screen === 'mistakes'" class="scroll page">
      <span class="kicker acc-text">Разбор</span>
      <div class="row between baseline">
        <h1 class="title">Ошибки</h1><span class="title err-text">{{ mistakes.length }}</span>
      </div>
      <span class="btn wide mb8"><span>Повторить все</span><span>→</span></span>
      <div class="rule">
        <div v-for="m in mistakes" :key="m.text" class="mistake col gap6">
          <span class="row between kicker-sm mut-text">
            <span>{{ topics[m.topic]![0] }}</span><span class="err-text">{{ m.times > 1 ? `×${m.times}` : '' }}</span>
          </span>
          <span class="mistake-q">{{ m.text }}</span>
          <span class="small mut-text">Верно: {{ m.answer }}</span>
        </div>
      </div>
    </div>

    <!-- Статистика -->
    <div v-else-if="screen === 'stats'" class="scroll page col gap20">
      <div>
        <span class="kicker acc-text">Прогресс</span>
        <h1 class="title flush">Статистика</h1>
      </div>
      <div class="grid2 four">
        <div class="cell"><div class="cell-label">Решено</div><div class="cell-value lg">{{ progress.solved }}</div></div>
        <div class="cell"><div class="cell-label">Точность</div><div class="cell-value lg">{{ pct(progress.accuracy) }}</div></div>
        <div class="cell">
          <div class="cell-label">Билетов сдано</div>
          <div class="cell-value lg">{{ progress.examsPassed }}<span class="of"> / {{ progress.examsTotal }}</span></div>
        </div>
        <div class="cell">
          <div class="cell-label">Слабых тем</div>
          <div class="cell-value lg err-text">{{ weakCount }}<span class="of"> / {{ topics.length }}</span></div>
        </div>
      </div>
      <div>
        <div class="section row between">
          <span class="section-title">Неделя</span><span class="small mut-text">{{ progress.weekTotal }} вопросов</span>
        </div>
        <div class="week">
          <div v-for="([day, h], i) in progress.week" :key="day" class="day">
            <div
              class="bar"
              :class="i === progress.week.length - 1 ? 'acc' : h === 0 ? 'sf' : 'ink'"
              :style="{ height: pct(Math.max(h, 3)) }"
            />
            <div class="tiny mut-text">{{ day }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="section row between">
          <span class="section-title">Готовность к экзамену</span>
          <span class="small strong acc-text">{{ pct(progress.readiness) }}</span>
        </div>
        <div class="track tall-track"><div class="fill acc" :style="{ width: pct(progress.readiness) }" /></div>
        <div class="small mut-text mt8">{{ hint }}</div>
      </div>
      <div>
        <div class="section"><span class="section-title">Категории · Казахстан</span></div>
        <div v-for="[code, name, p, common, own] in progress.categories" :key="code" class="topic cat">
          <span class="cat-code">{{ code }}</span>
          <span class="col gap6">
            <span class="row between small" :class="{ strong: code === 'B' }">
              <span>{{ name }}</span><span v-if="code === 'B'" class="tag acc-text">текущая</span>
            </span>
            <span class="track split">
              <span class="ink" :style="{ width: pct(common) }" /><span class="acc" :style="{ width: pct(own) }" />
            </span>
          </span>
          <span class="topic-pct">{{ pct(p) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dark theme, blue accent — the app's `night` tokens. */
.app {
  --bg: #201e1d;
  --sf: #2d2b2b;
  --ink: #f3f2f2;
  --mut: #bab6b6;
  --div: rgba(243, 242, 242, 0.35);
  --acc: #3a6ff0;
  --on-acc: #ffffff;
  --err: #e8432a;
  --ok: #9ad07a;
  --ok-ink: #201e1d;
  --hero: #2d2b2b;
  --hero-track: #444141;

  height: 874px;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.4;
  text-align: left;
}

.scroll {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page {
  padding: 72px 20px 20px;
}

.pad {
  padding: 20px;
}

.row {
  display: flex;
}
.col {
  display: flex;
  flex-direction: column;
}
.between {
  justify-content: space-between;
}
.baseline {
  align-items: baseline;
}
.center {
  align-items: center;
}
.gap6 {
  gap: 6px;
}
.gap8 {
  gap: 8px;
}
.gap10 {
  gap: 10px;
}
.gap14 {
  gap: 14px;
}
.gap20 {
  gap: 20px;
}
.mb8 {
  margin-bottom: 8px;
}
.mt8 {
  margin-top: 8px;
}

.kicker {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}
.kicker-sm {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.small {
  font-size: 13px;
}
.tiny {
  font-size: 12px;
}
.strong {
  font-weight: 800;
}
.acc-text {
  color: var(--acc);
}
.mut-text {
  color: var(--mut);
}
.err-text {
  color: var(--err);
}

.title {
  margin: 4px 0 16px;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.title.flush {
  margin-bottom: 0;
}

/* Home hero */
.hero {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 72px 20px 20px;
  background: var(--hero);
}
.big {
  font-size: 56px;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.hint {
  margin-left: auto;
  max-width: 180px;
  font-size: 13px;
  font-weight: 600;
  text-align: right;
}

.track {
  display: flex;
  background: var(--sf);
}
.track.hero-track {
  height: 6px;
  background: var(--hero-track);
}
.track.thin {
  height: 3px;
}
.track.tall-track {
  height: 10px;
  margin-top: 12px;
}
.track.split {
  height: 4px;
}
.fill {
  display: block;
  height: 100%;
}
.acc {
  background: var(--acc);
}
.err {
  background: var(--err);
}
.ink {
  background: var(--ink);
}
.sf {
  background: var(--sf);
}

.ticket {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 96px;
  padding: 18px;
  background: var(--acc);
  color: var(--on-acc);
}
.ticket-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.arrow {
  font-size: 22px;
}
.ticket-rule {
  font-size: 13px;
  font-weight: 600;
}

.section {
  padding-bottom: 8px;
  border-bottom: 2px solid var(--div);
}
.section-title {
  font-size: 17px;
  font-weight: 800;
}
.link {
  color: var(--acc);
  font-size: 13px;
  font-weight: 600;
}

.topic {
  display: grid;
  grid-template-columns: 32px 1fr 44px;
  gap: 12px;
  align-items: center;
  min-height: 48px;
  padding: 12px 0;
  border-bottom: 1px solid var(--div);
}
.topic.tall {
  grid-template-columns: 28px 1fr 44px;
  min-height: 52px;
  padding: 13px 0;
}
.topic.cat {
  grid-template-columns: 28px 1fr 44px;
  min-height: 0;
  padding: 11px 0;
}
.num {
  color: var(--mut);
  font-size: 12px;
  font-weight: 600;
}
.topic-name {
  font-size: 14px;
  font-weight: 600;
}
.topic-pct {
  font-size: 14px;
  font-weight: 800;
  text-align: right;
}
.cat-code {
  font-size: 18px;
  font-weight: 800;
}
.tag {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--div);
}
.cell {
  padding: 14px;
}
.cell:nth-child(odd) {
  border-right: 1px solid var(--div);
}
.four .cell:nth-child(-n + 2) {
  border-bottom: 1px solid var(--div);
}
.cell-label {
  color: var(--mut);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cell-value {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
}
.cell-value.lg {
  font-size: 30px;
}
.of {
  color: var(--mut);
  font-size: 14px;
}

.btn {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  padding: 12px 14px;
  background: var(--acc);
  color: var(--on-acc);
  font-weight: 800;
}
.btn.outline {
  border: 1px solid var(--div);
  background: transparent;
  color: var(--ink);
}
.btn.wide {
  flex: none;
  min-height: 52px;
  padding: 14px 18px;
  font-size: 16px;
}
.btn.disabled {
  opacity: 0.45;
}
.rule {
  border-top: 2px solid var(--div);
}

/* Question */
.question {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.q-head {
  padding: 64px 20px 0;
}
.exit {
  padding: 8px 0;
  color: var(--mut);
  font-size: 13px;
  font-weight: 600;
}
.timer {
  min-width: 1px;
  font-size: 15px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.cells {
  display: flex;
  gap: 2px;
}
.qcell {
  flex: 1;
  height: 4px;
}
.q-body {
  flex: 1;
  overflow: hidden;
  padding: 12px 20px 20px;
}
.image {
  display: flex;
  align-items: flex-end;
  height: 170px;
  padding: 10px;
  border: 1px solid var(--div);
  background: repeating-linear-gradient(135deg, var(--sf) 0 8px, transparent 8px 16px);
}
.image span {
  padding: 3px 6px;
  background: var(--bg);
  color: var(--mut);
  font: 11px ui-monospace, Menlo, monospace;
}
.q-text {
  font-size: 19px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.opt {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  align-items: start;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid var(--div);
  font-size: 15px;
  line-height: 1.35;
}
.opt.ok {
  border-color: var(--ok);
  background: var(--ok);
  color: var(--ok-ink);
}
.opt.bad {
  border-color: var(--err);
  background: var(--err);
  color: #fff;
}
.letter {
  padding-top: 2px;
  font-size: 13px;
  font-weight: 800;
}
.explain {
  padding-top: 12px;
  border-top: 2px solid var(--div);
}
.explain-text {
  color: var(--mut);
  font-size: 14px;
}
.q-foot {
  display: flex;
  flex-direction: column;
  padding: 12px 20px 44px;
  border-top: 2px solid var(--div);
}

/* Mistakes */
.mistake {
  padding: 14px 0;
  border-bottom: 1px solid var(--div);
}
.mistake-q {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

/* Stats week */
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  align-items: end;
  height: 110px;
  margin-top: 12px;
}
.day {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  height: 100%;
}
</style>
