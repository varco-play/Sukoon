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
    name: 'Ягнёнок с розмарином',
    description: 'Томлёное плечо ягнёнка с ароматными травами, запечёнными корнеплодами и соусом из красного вина',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    category: 'Горячее',
  },
  {
    id: '2',
    name: 'Камбала на углях',
    description: 'Свежая камбала на мангале с лимонным маслом, каперсами и микрозеленью',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
    category: 'Рыба и морепродукты',
  },
  {
    id: '3',
    name: 'Тартар из говядины',
    description: 'Мраморная говядина ручной рубки, перепелиный желток, трюфельное масло и поджаренный бриошь',
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    category: 'Закуска',
  },
  {
    id: '4',
    name: 'Шоколадный фондан',
    description: 'Тёплый бельгийский шоколад с жидкой сердцевиной, ванильное мороженое и карамельный соус',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    category: 'Десерт',
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
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    alt: 'Фирменное блюдо из ягнёнка',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Атмосфера ресторана вечером',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    alt: 'Коктейльный бар',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80',
    alt: 'Изысканная подача десертов',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
    alt: 'Терраса при свечах',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    alt: 'Сервировка стола',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    alt: 'Авторское блюдо шеф-повара',
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
