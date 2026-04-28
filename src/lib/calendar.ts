import type { CalendarEvent, BookingData } from '@/types'
import { CALENDAR_ID, DINING_BUFFER_MINUTES, SLOT_DURATION_MINUTES } from './config'
import { MOCK_CALENDAR_EVENTS } from './mockData'
import { parse, addMinutes, startOfDay, endOfDay } from 'date-fns'

function parseBookingDateTime(date: string, time: string): Date {
  return parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date())
}

async function getGoogleAuth() {
  const { google } = await import('googleapis')
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

export async function getCalendarEvents(date: string): Promise<CalendarEvent[]> {
  // Use mock data when Google Calendar is not configured
  if (!CALENDAR_ID || !process.env.GOOGLE_CLIENT_EMAIL) {
    // Filter mock events to the requested date
    return MOCK_CALENDAR_EVENTS.filter((e) => e.start.startsWith(date))
  }

  try {
    const { google } = await import('googleapis')
    const auth = await getGoogleAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    const dayStart = startOfDay(new Date(date)).toISOString()
    const dayEnd   = endOfDay(new Date(date)).toISOString()

    const res = await calendar.events.list({
      calendarId:   CALENDAR_ID,
      timeMin:      dayStart,
      timeMax:      dayEnd,
      singleEvents: true,
      orderBy:      'startTime',
    })

    return (res.data.items ?? []).map((item) => ({
      start:   item.start?.dateTime ?? item.start?.date ?? '',
      end:     item.end?.dateTime   ?? item.end?.date   ?? '',
      summary: item.summary ?? '',
    }))
  } catch (err) {
    console.error('Google Calendar fetch failed, using mock data:', err)
    return MOCK_CALENDAR_EVENTS.filter((e) => e.start.startsWith(date))
  }
}

export async function createCalendarEvent(booking: BookingData): Promise<string> {
  const start = parseBookingDateTime(booking.date, booking.time)
  const end   = addMinutes(start, SLOT_DURATION_MINUTES + DINING_BUFFER_MINUTES)

  if (!CALENDAR_ID || !process.env.GOOGLE_CLIENT_EMAIL) {
    // Mock response for development
    console.log('Mock: Would create calendar event for', booking)
    return `mock-event-${Date.now()}`
  }

  const { google } = await import('googleapis')
  const auth = await getGoogleAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary:     `Бронирование: ${booking.name} (${booking.guests} чел.)`,
      description: `Телефон: ${booking.phone}${booking.comment ? '\nКомментарий: ' + booking.comment : ''}`,
      start: { dateTime: start.toISOString(), timeZone: 'Asia/Tashkent' },
      end:   { dateTime: end.toISOString(),   timeZone: 'Asia/Tashkent' },
    },
  })

  return res.data.id ?? ''
}
