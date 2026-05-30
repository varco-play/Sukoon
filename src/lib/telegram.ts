import type { BookingData } from '@/types'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? ''
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID   ?? ''

function formatMessage(b: BookingData): string {
  const guestWord = b.guests === 1 ? 'гость' : b.guests < 5 ? 'гостя' : 'гостей'

  const lines = [
    `🍽 <b>Новая заявка на бронирование</b>`,
    ``,
    `👤 <b>Имя:</b> ${b.name}`,
    `📞 <b>Телефон:</b> ${b.phone}`,
    `📅 <b>Дата:</b> ${b.date}`,
    `🕐 <b>Время:</b> ${b.time}`,
    `👥 <b>Гостей:</b> ${b.guests} ${guestWord}`,
  ]

  if (b.comment?.trim()) {
    lines.push(`💬 <b>Комментарий:</b> ${b.comment.trim()}`)
  }

  lines.push(``, `<i>Sukoon Cafe · Ташкент</i>`)

  return lines.join('\n')
}

export async function sendBookingNotification(booking: BookingData): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    // Credentials not set yet — log and skip silently (don't break the flow)
    console.warn('[Telegram] BOT_TOKEN or CHAT_ID not set — notification skipped')
    return
  }

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    CHAT_ID,
      text:       formatMessage(booking),
      parse_mode: 'HTML',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    // Throw so the API route can log it, but booking still succeeds
    throw new Error(`Telegram API error ${res.status}: ${err}`)
  }
}
