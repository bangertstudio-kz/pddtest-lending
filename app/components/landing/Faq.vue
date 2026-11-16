<script setup lang="ts">
const { data: c } = await useCatalog()

const faq = computed(() => {
  const free = c.value?.freeTopics ?? 0
  const all = c.value?.topics ?? 0
  const trial = c.value?.trialDays ?? 0
  return [
    {
      q: 'Вопросы совпадают с настоящим экзаменом?',
      a: 'Да, база собрана из экзаменационных билетов и обновляется вместе с изменениями ПДД.',
    },
    {
      q: 'Что входит в бесплатную версию?',
      a: `${free} ${plural(free, ['тема', 'темы', 'тем'])} и режим экзамена. Все ${all} ${plural(all, ['тема', 'темы', 'тем'])} и работа над ошибками по ним - в Премиум.`,
    },
    {
      q: 'Если я сменю категорию, прогресс пропадёт?',
      a: 'Нет. Общие вопросы - знаки, разметка, первая помощь - засчитываются во все категории. С нуля придётся решать только вопросы новой категории.',
    },
    {
      q: 'Как отменить подписку?',
      a: `В настройках подписок App Store или Google Play.${trial ? ` Если отменить во время ${trial}-дневного пробного периода, списания не будет.` : ''}`,
    },
  ]
})
</script>

<template>
  <section id="faq" class="section">
    <div class="wrap">
      <LandingSectionHead title="Вопросы и ответы" />
      <div class="list">
        <!-- Native accordion: `name` keeps one answer open at a time, no JS. -->
        <details v-for="(item, i) in faq" :key="item.q" name="faq" :open="i === 0">
          <summary>
            <span>{{ item.q }}</span><LandingIcon name="plus" class="sign" />
          </summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  max-width: 860px;
}
details {
  border-bottom: 1px solid var(--line);
}
summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  font-size: 19px;
  font-weight: 500;
  cursor: pointer;
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
.sign {
  flex: none;
  color: var(--acc);
  transition: transform 0.2s;
}
details[open] .sign {
  transform: rotate(45deg);
}
details p {
  padding-bottom: 24px;
  color: var(--mut);
}
</style>
