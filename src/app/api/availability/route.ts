import { NextRequest, NextResponse } from 'next/server'
import { getCalendarEvents } from '@/lib/calendar'
import { generateSlots } from '@/lib/reservations'

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Неверный формат даты' }, { status: 400 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const requested = new Date(date)
  if (requested < today) {
    return NextResponse.json({ error: 'Нельзя выбрать прошедшую дату' }, { status: 400 })
  }

  try {
    const events = await getCalendarEvents(date)
    const slots  = generateSlots(date, events)
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('Availability error:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
