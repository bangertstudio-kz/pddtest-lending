// Landing copy. Facts - countries, rules, topics, questions, prices - are not
// here: they come from the app's API (`useCatalog`).

/** Store pages. Google Play's opens once the Android app is published. */
export const storeLinks = {
  appStore: 'https://apps.apple.com/app/id6817777413',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.bangertstudio.pddtest',
}

/** The one address the site gives: support, the offer, personal data. */
export const contactEmail = 'alexganbert@gmail.com'

export const nav = [
  { href: '#countries', label: 'Страны' },
  { href: '#pricing', label: 'Цены' },
  { href: '#faq', label: 'Вопросы' },
]

/** The app's screens the phones show: the store screenshots' raw frames. */
export type Screen = 'home' | 'exam' | 'explain' | 'mistakes' | 'topics' | 'stats'

/** Countries on their way: shown as «скоро» next to the ones the API has. */
export const soonCountries = ['KZ', 'UZ', 'BY']

/** The plan the pricing marks, and a line under each plan, by plan code. */
export const popularPlan = 'quarter'
export const planNotes: Record<string, string> = {
  month: 'Если экзамен совсем скоро',
  quarter: 'Столько обычно длится подготовка',
  year: 'Для нескольких категорий',
}

// ponytail: the country by the browser's time zone for Kazakhstan and Russia
// - no geo-IP service, and a VPN does not fool it - and by the language's
// region elsewhere («de-DE» → DE). The API gives a country the stores do not
// list the US price.
const kzZones = ['Almaty', 'Qostanay', 'Aqtobe', 'Aqtau', 'Atyrau', 'Oral', 'Qyzylorda'].map((z) => `Asia/${z}`)
const ruZones = [
  ...['Moscow', 'Kaliningrad', 'Samara', 'Volgograd', 'Saratov', 'Ulyanovsk', 'Astrakhan', 'Kirov'].map((z) => `Europe/${z}`),
  ...['Yekaterinburg', 'Omsk', 'Novosibirsk', 'Barnaul', 'Tomsk', 'Novokuznetsk', 'Krasnoyarsk', 'Irkutsk', 'Chita',
    'Yakutsk', 'Khandyga', 'Vladivostok', 'Ust-Nera', 'Magadan', 'Sakhalin', 'Srednekolymsk', 'Kamchatka', 'Anadyr'].map((z) => `Asia/${z}`),
]

/** The visitor's country, ISO alpha-2: what the store would charge them in. */
export function visitorCountry(
  zone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  languages: readonly string[] = typeof navigator === 'undefined' ? [] : navigator.languages,
): string {
  if (kzZones.includes(zone)) return 'KZ'
  if (ruZones.includes(zone)) return 'RU'
  // Outside their time zones a ru-RU or kk-KZ browser is a traveller.
  const region = languages.map((l) => /-([A-Z]{2})\b/i.exec(l)?.[1]?.toUpperCase()).find(Boolean)
  return region && region !== 'RU' && region !== 'KZ' ? region : 'US'
}
