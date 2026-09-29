// What the phone mockups show: the app's demo state from the design
// (`pdd-data.js` and the PDD App start screens), dark theme, blue accent.

export type Screen = 'home' | 'wrong' | 'topics' | 'exam' | 'mistakes' | 'stats'

export const topics: [name: string, pct: number][] = [
  ['Общие положения', 92],
  ['Обязанности водителей', 78],
  ['Сигналы светофора и регулировщика', 64],
  ['Дорожные знаки', 41],
  ['Дорожная разметка', 55],
  ['Начало движения, маневрирование', 70],
  ['Скорость движения', 88],
  ['Обгон и встречный разъезд', 33],
  ['Остановка и стоянка', 47],
  ['Проезд перекрёстков', 29],
  ['Пешеходные переходы', 81],
  ['Ж/д переезды', 60],
  ['Первая помощь', 24],
  ['Ответственность водителя', 52],
]

export interface Question {
  topic: number
  image?: string
  text: string
  options: string[]
  correct: number
  explain: string
}

/** The two questions the mockups open on. */
export const questions = {
  /** Training, answer revealed as wrong. */
  signal: {
    topic: 2,
    image: 'схема: регулировщик, рука поднята вверх',
    text: 'Регулировщик поднял руку вверх. Что это означает?',
    options: ['Разрешено движение прямо', 'Движение запрещено всем', 'Разрешён поворот направо', 'Уступи трамваю'],
    correct: 1,
    explain: 'Поднятая вверх рука — сигнал «Внимание, движение запрещено» для всех направлений.',
  },
  /** Exam, nothing picked yet. */
  speed: {
    topic: 6,
    text: 'Какая максимальная скорость разрешена легковому автомобилю в населённом пункте в РК?',
    options: ['50 км/ч', '60 км/ч', '70 км/ч', '80 км/ч'],
    correct: 1,
    explain: 'В населённых пунктах — не более 60 км/ч, если знаками не установлен иной режим.',
  },
} satisfies Record<string, Question>

export const mistakes = [
  { topic: 3, text: 'Что запрещает этот знак?', answer: 'Остановку и стоянку', times: 2 },
  { topic: 4, text: 'Разрешено ли пересекать эту линию разметки?', answer: 'Нет', times: 1 },
  { topic: 11, text: 'Шлагбаум открыт, но мигает красный сигнал. Можно ли ехать?', answer: 'Нет, запрещено', times: 1 },
]

export const progress = {
  solved: 412,
  accuracy: 88,
  examsPassed: 2,
  examsTotal: 3,
  readiness: 75,
  place: 'Казахстан · B',
  week: [
    ['Пн', 60],
    ['Вт', 35],
    ['Ср', 0],
    ['Чт', 80],
    ['Пт', 45],
    ['Сб', 100],
    ['Вс', 20],
  ] as [string, number][],
  weekTotal: 104,
  /** Category → [pct, common share %, own share %] of the whole bank. */
  categories: [
    ['A', 'Мотоциклы', 64, 64.1, 0],
    ['B', 'Легковые', 75, 58.6, 16.9],
    ['C', 'Грузовые', 60, 60.3, 0],
    ['D', 'Автобусы', 59, 59.4, 0],
  ] as [string, string, number, number, number][],
}

export const weakCount = topics.filter(([, pct]) => pct < 50).length
