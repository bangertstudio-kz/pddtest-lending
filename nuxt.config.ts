// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  // The app's API, where the landing reads countries, topics and prices.
  // NUXT_PUBLIC_API_BASE overrides it, e.g. a local `make up` at
  // http://127.0.0.1:8100.
  runtimeConfig: { public: { apiBase: 'https://api.pddtest.bangertstudio.kz' } },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'ПДД Тесты - сдай теорию с первого раза',
      meta: [
        { name: 'theme-color', content: '#0a0c11' },
        { property: 'og:title', content: 'ПДД тесты - сдай теорию с первого раза' },
        {
          property: 'og:description',
          content: 'Билеты ПДД, экзамен с таймером и разбор каждой ошибки.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&family=Unbounded:wght@600;700;800&display=swap',
        },
      ],
    },
  },
})
