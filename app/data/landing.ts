// Landing copy. Facts - countries, rules, topics, questions, prices - are not
// here: they come from the app's API (`useCatalog`).

/** Store pages. Google Play's opens once the Android app is published. */
export const storeLinks = {
  appStore: 'https://apps.apple.com/app/id6817777413',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.bangertstudio.pddtest',
}

export const contactEmail = 'hello@pdd.app'

/** Who the offer and the privacy policy are from. A placeholder until the real name and БИН/ИИН are known. */
export const legalEntity = '[наименование ИП или ТОО, БИН/ИИН, адрес]'

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
