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
        { name: 'yandex-verification', content: '27e6de1adabd13b5' },
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
      // Yandex.Metrika, counter 114268713 - the snippet from its settings.
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=114268713','ym');
ym(114268713,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
        },
      ],
      noscript: [
        {
          innerHTML:
            '<div><img src="https://mc.yandex.ru/watch/114268713" style="position:absolute;left:-9999px" alt=""></div>',
          tagPosition: 'bodyClose',
        },
      ],
    },
  },
})
