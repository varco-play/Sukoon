import type { Dish, Review, GalleryImage, CalendarEvent } from '@/types'

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Алина М.',
    rating: 5,
    text: 'Невероятная атмосфера и изысканная кухня. Мы отмечали здесь годовщину свадьбы — персонал был безупречен, а каждое блюдо стало настоящим открытием. Обязательно вернёмся.',
    date: '2026-03-15',
  },
  {
    id: '2',
    name: 'Бахтиёр Р.',
    rating: 5,
    text: 'Sukoon — это особое место. Тихое, элегантное, с вниманием к каждой детали. Ягнёнок с розмарином — лучшее, что я пробовал в Ташкенте. Сервис на уровне пятизвёздочного отеля.',
    date: '2026-02-28',
  },
  {
    id: '3',
    name: 'Камилла Н.',
    rating: 5,
    text: 'Приходила сюда на деловой ужин. Было идеально — тихая музыка, безупречная сервировка и блюда, которые произвели впечатление даже на взыскательных гостей. Рекомендую от всей души.',
    date: '2026-04-10',
  },
]

export const FEATURED_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Рибай-стейк',
    description: 'Сочный рибай на косточке, подаётся с гарниром на выбор и фирменным соусом от шефа',
    imageUrl: 'https://images.unsplash.com/photo-1706650616334-97875fae8521?w=800&q=80',
    category: 'Горячее',
  },
  {
    id: '2',
    name: 'Филе лосося',
    description: 'Нежное филе лосося в азиатском маринаде с кунжутом, имбирём и соусом терияки',
    imageUrl: 'https://images.unsplash.com/photo-1712334562767-5d366d0c40d9?w=800&q=80',
    category: 'Паназия',
  },
  {
    id: '3',
    name: 'Баранья корейка',
    description: 'Корейка молодого барашка на углях с ароматными травами и соусом из граната',
    imageUrl: 'https://images.unsplash.com/photo-1692106914421-e04e1066bd62?w=800&q=80',
    category: 'Гриль',
  },
  {
    id: '4',
    name: 'Хачапури по-аджарски',
    description: 'Лодочка из дрожжевого теста с сулугуни, сливочным маслом и яйцом',
    imageUrl: 'https://images.unsplash.com/photo-1612950365098-e3914d82ee85?w=800&q=80',
    category: 'Из Печи',
  },
]

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Интерьер главного зала',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1706650616334-97875fae8521?w=800&q=80',
    alt: 'Рибай-стейк с гарниром',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Атмосфера ресторана вечером',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1671048116858-e8ef69175b2d?w=800&q=80',
    alt: 'Палов — классика узбекской кухни',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1712334562767-5d366d0c40d9?w=800&q=80',
    alt: 'Филе лосося в азиатском маринаде',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
    alt: 'Терраса при свечах',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1626323109252-0adb3b46692b?w=800&q=80',
    alt: 'Шашлык на мангале',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80',
    alt: 'Паста Карбонара',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1692106914421-e04e1066bd62?w=800&q=80',
    alt: 'Баранья корейка на гриле',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    alt: 'Сервировка стола',
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1612950365098-e3914d82ee85?w=800&q=80',
    alt: 'Хачапури по-аджарски',
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800&q=80',
    alt: 'Стейк medium rare',
  },
]

// Mock calendar events used when GOOGLE_CALENDAR_ID is not set
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    start: new Date(Date.now() + 86400000).toISOString().replace(/T\d{2}:\d{2}/, 'T13:00').slice(0, 19),
    end:   new Date(Date.now() + 86400000).toISOString().replace(/T\d{2}:\d{2}/, 'T15:30').slice(0, 19),
    summary: 'Тестовое бронирование',
  },
  {
    start: new Date(Date.now() + 86400000).toISOString().replace(/T\d{2}:\d{2}/, 'T18:00').slice(0, 19),
    end:   new Date(Date.now() + 86400000).toISOString().replace(/T\d{2}:\d{2}/, 'T20:30').slice(0, 19),
    summary: 'Тестовое бронирование 2',
  },
]
