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
/** Money comes as an integer of the currency's minor unit with its ISO 4217 code, as in Stripe's API: 34900 RUB is 349 ₽. */
interface ApiPlan {
  code: string
  months: number
  price: number
  per_month: number
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
/** 2490, 'KZT' → «2 490 ₸»; 3.99, 'USD' → «3,99 $»: kopecks only where the price has them. */
export const formatMoney = (n: number, currency: string) => {
  const digits = Number.isInteger(n) ? 0 : 2
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

/** Minor units of currency as a decimal amount: Intl knows the currency's digits - 2 for RUB, 0 for JPY. */
const fromMinorUnits = (minor: number, currency: string) =>
  minor / 10 ** new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits!

/** A plan as the pricing shows it. */
const toPlan = (p: ApiPlan) => ({
  code: p.code,
  months: p.months,
  name: `${p.months} ${plural(p.months, ['месяц', 'месяца', 'месяцев'])}`,
  price: fromMinorUnits(p.price, p.currency),
  perMonth: fromMinorUnits(p.per_month, p.currency),
  currency: p.currency,
  trialDays: p.trial_days,
})
export type Plan = ReturnType<typeof toPlan>

/** The plans at the stores' prices in a country (ISO alpha-2). */
export const fetchPlans = async (api: string, country: string) =>
  (await $fetch<ApiPlan[]>('/v1/billing/plans', { baseURL: api, query: { country } })).map(toPlan)
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
      // The App Store's prices in Kazakhstan; the pricing asks for the
      // visitor's country in the browser.
      plans: plans.map(toPlan),
      trialDays: Math.max(0, ...plans.map((p) => p.trial_days)),
    }
  })
}
