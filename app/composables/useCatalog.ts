// What the landing says about the app - countries, their exam rules and
// categories, the topics and the question bank, the plans and their prices -
// comes from the app's own API, read once when the site is generated. Change
// the database, regenerate the site.

interface ApiCategory {
  code: string
  name: string
  description: string
}
interface ApiCountry {
  id: number
  code: string
  exam_questions: number
  max_wrong: number
  categories: ApiCategory[]
}
interface ApiTopic {
  name: string
  is_free: boolean
  questions: number
}
interface ApiPlan {
  code: string
  months: number
  price_tiyn: number
  per_month_tiyn: number
  trial_days: number
  currency: string
}

/** Russian plural: `plural(5, ['тема', 'темы', 'тем'])` → «тем». */
export function plural(n: number, [one, few, many]: [string, string, string]) {
  const form = new Intl.PluralRules('ru').select(n)
  return form === 'one' ? one : form === 'few' ? few : many
}

const number = new Intl.NumberFormat('ru-RU')
/** 1394 → «1 394». */
export const formatNumber = (n: number) => number.format(n)
const regions = new Intl.DisplayNames(['ru'], { type: 'region' })

export function useCatalog() {
  const api = useRuntimeConfig().public.apiBase
  return useAsyncData('catalog', async () => {
    // Each request on its own: one that fails leaves its part out, not the
    // whole page - the prices still show when the catalogue is down.
    const get = <T>(path: string, fallback: T) =>
      $fetch<T>(path, { baseURL: api, headers: { 'Accept-Language': 'ru' } }).catch((e) => {
        console.warn(`[catalog] ${api}${path}: ${e}`)
        return fallback
      })
    const [countries, plans] = await Promise.all([
      get<ApiCountry[]>('/v1/content/countries', []),
      get<ApiPlan[]>('/v1/billing/plans', []),
    ])
    const topics = await Promise.all(
      countries.map((c) => get<ApiTopic[]>(`/v1/content/topics?country_id=${c.id}`, [])),
    )

    const money = (tiyn: number, currency: string) =>
      new Intl.NumberFormat('ru-RU', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(tiyn / 100)
    const monthly = plans.find((p) => p.months === 1)

    const list = countries.map((c, i) => ({
      code: c.code,
      name: regions.of(c.code) ?? c.code,
      // A minute a question, as the app's exam timer counts.
      rule: `${c.exam_questions} ${plural(c.exam_questions, ['вопрос', 'вопроса', 'вопросов'])} · ${c.exam_questions} мин · ${c.max_wrong} ${plural(c.max_wrong, ['ошибка', 'ошибки', 'ошибок'])}`,
      examQuestions: c.exam_questions,
      maxWrong: c.max_wrong,
      categories: c.categories,
      topics: topics[i]!.length,
      freeTopics: topics[i]!.filter((t) => t.is_free).length,
      questions: topics[i]!.reduce((n, t) => n + t.questions, 0),
    }))
    return {
      countries: list,
      // Across the countries: what the numbers row and the copy quote.
      questions: list.reduce((n, c) => n + c.questions, 0),
      topics: Math.max(0, ...list.map((c) => c.topics)),
      freeTopics: list.length ? Math.min(...list.map((c) => c.freeTopics)) : 0,
      categories: [...new Set(list.flatMap((c) => c.categories.map((k) => k.code)))],
      plans: plans.map((p) => ({
        code: p.code,
        months: p.months,
        name: `${p.months} ${plural(p.months, ['месяц', 'месяца', 'месяцев'])}`,
        price: money(p.price_tiyn, p.currency),
        perMonth: `${money(p.per_month_tiyn, p.currency)} / мес`,
        trialDays: p.trial_days,
        discount: monthly ? Math.round((1 - p.per_month_tiyn / monthly.per_month_tiyn) * 100) : 0,
      })),
      free: money(0, plans[0]?.currency ?? 'KZT'),
      trialDays: Math.max(0, ...plans.map((p) => p.trial_days)),
    }
  })
}
