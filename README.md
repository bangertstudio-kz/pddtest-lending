# pddtest-lending

Лендинг приложения «ПДД тесты» на Nuxt 4 — по макету `Лендинг.dc.html` из Claude Design.

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # статический сайт в .output/public
npm run typecheck
```

- Тексты и цены — `app/data/landing.ts`, ссылки на сторы — там же (`storeLinks`, пока `#`).
- Телефоны на лендинге — не скриншоты, а экраны приложения в вёрстке (`app/components/phone`),
  данные для них — `app/data/demo.ts`.
