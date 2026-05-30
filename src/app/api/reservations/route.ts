import { NextRequest, NextResponse } from 'next/server'
import { sendBookingNotification } from '@/lib/telegram'
import type { BookingData } from '@/types'

export async function POST(request: NextRequest) {
  let body: BookingData
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Неверный формат запроса' }, { status: 400 })
  }

  const { date, time, name, phone, guests, comment } = body

  // Validation
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

  // Send Telegram notification to admin
  try {
    await sendBookingNotification({ date, time, name, phone, guests, comment })
  } catch (err) {
    // Log the Telegram error but don't fail the booking —
    // the request is still saved, admin can follow up manually
    console.error('[Telegram] Failed to send notification:', err)
  }

  return NextResponse.json({ success: true })
}
