<script setup lang="ts">
const { data: c } = await useCatalog()
useSeoMeta({
  description: () =>
    c.value
      ? `Билеты ПДД, экзамен с таймером и разбор каждой ошибки. ${c.value.countries.map((x) => x.name).join(', ')} - категории ${c.value.categories.join(', ')}.`
      : 'Билеты ПДД, экзамен с таймером и разбор каждой ошибки.',
})
</script>

<template>
  <div>
    <LandingHeader />
    <main>
      <LandingHero />
      <LandingCountries />
      <LandingPricing />
      <LandingFaq />
      <LandingCta />
    </main>
    <LandingFooter />
  </div>
</template>
