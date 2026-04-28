import { NextRequest, NextResponse } from 'next/server'
import { getCalendarEvents } from '@/lib/calendar'
import { createCalendarEvent } from '@/lib/calendar'
import { generateSlots } from '@/lib/reservations'
import type { BookingData } from '@/types'

export async function POST(request: NextRequest) {
  let body: BookingData
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Неверный формат запроса' }, { status: 400 })
  }

  const { date, time, name, phone, guests, comment } = body

  if (!date || !time || !name || !phone || !guests) {
    return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Неверный формат даты' }, { status: 400 })
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ error: 'Неверный формат времени' }, { status: 400 })
  }

  if (guests < 1 || guests > 8) {
    return NextResponse.json({ error: 'Количество гостей: от 1 до 8' }, { status: 400 })
  }

  // Re-verify slot availability server-side
  try {
    const events = await getCalendarEvents(date)
    const slots  = generateSlots(date, events)
    const slot   = slots.find((s) => s.start === time)

    if (!slot || !slot.available) {
      return NextResponse.json({ error: 'Выбранное время уже занято' }, { status: 409 })
    }

    const eventId = await createCalendarEvent({ date, time, name, phone, guests, comment })
    return NextResponse.json({ success: true, eventId })
  } catch (err) {
    console.error('Reservation error:', err)
    return NextResponse.json({ error: 'Ошибка при создании бронирования' }, { status: 500 })
  }
}
