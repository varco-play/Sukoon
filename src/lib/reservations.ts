import { parse, addMinutes, format, isAfter, isBefore, parseISO } from 'date-fns'
import { OPERATING_HOURS, SLOT_DURATION_MINUTES, DINING_BUFFER_MINUTES } from './config'
import type { TimeSlot, CalendarEvent } from '@/types'

function parseTime(date: string, time: string): Date {
  return parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date())
}

export function isSlotAvailable(slotStart: Date, events: CalendarEvent[]): boolean {
  const slotEnd = addMinutes(slotStart, SLOT_DURATION_MINUTES)

  for (const event of events) {
    const eventStart = parseISO(event.start)
    // Table is occupied from eventStart until eventStart + buffer + slot duration
    const eventOccupiedUntil = addMinutes(eventStart, SLOT_DURATION_MINUTES + DINING_BUFFER_MINUTES)

    // Slot overlaps event's occupied window if slot starts before occupied end AND slot ends after event start
    const overlaps = isBefore(slotStart, eventOccupiedUntil) && isAfter(slotEnd, eventStart)
    if (overlaps) return false
  }

  return true
}

export function generateSlots(date: string, events: CalendarEvent[]): TimeSlot[] {
  const open  = parseTime(date, OPERATING_HOURS.open)
  const close = parseTime(date, OPERATING_HOURS.close)
  const slots: TimeSlot[] = []

  let current = open
  while (isBefore(current, close)) {
    const next = addMinutes(current, SLOT_DURATION_MINUTES)
    // Don't create a slot if it would run past closing time
    if (isAfter(next, close)) break

    slots.push({
      start:     format(current, 'HH:mm'),
      end:       format(next, 'HH:mm'),
      available: isSlotAvailable(current, events),
    })
    current = next
  }

  return slots
}
