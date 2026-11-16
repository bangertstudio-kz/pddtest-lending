# pddtest-lending

Лендинг приложения «ПДД тесты» на Nuxt 4 - по макету `Лендинг.dc.html` из Claude Design.

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # статический сайт в .output/public
npm run typecheck
```

- Страны, правила экзамена, категории, темы, число вопросов и цены - из API приложения
  (`app/composables/useCatalog.ts`), читаются при `npm run generate`. Поменяли базу - пересоберите сайт.
  Локальный бэкенд: `NUXT_PUBLIC_API_BASE=http://127.0.0.1:8100 npm run generate`.
- Тексты - `app/data/landing.ts` и сами секции, ссылки на сторы - там же.
- Телефоны - настоящие экраны приложения (`public/screens`), их кладёт
  `tool/screenshots/run.sh` из репозитория приложения вместе со скриншотами для стора.
