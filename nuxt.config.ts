// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'ПДД тесты — сдай теорию с первого раза',
      meta: [
        {
          name: 'description',
          content:
            'Официальные билеты ПДД, экзамен с таймером и разбор каждой ошибки. Казахстан, Россия, Беларусь, Узбекистан — категории A, B, C, D.',
        },
        { name: 'theme-color', content: '#2457d5' },
        { property: 'og:title', content: 'ПДД тесты — сдай теорию с первого раза' },
        {
          property: 'og:description',
          content: 'Официальные билеты, экзамен с таймером и разбор каждой ошибки.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap',
        },
      ],
    },
  },
})
