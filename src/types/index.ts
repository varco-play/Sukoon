export interface Dish {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
}

export interface Review {
  id: string
  name: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface CalendarEvent {
  start: string
  end: string
  summary: string
}

export interface BookingData {
  date: string
  time: string
  name: string
  phone: string
  guests: number
  comment?: string
}

export interface BookingDetails {
  name: string
  phone: string
  guests: number
  comment: string
}
