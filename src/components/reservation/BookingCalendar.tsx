'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns'
import { ru } from 'date-fns/locale'

interface BookingCalendarProps {
  selected: Date | null
  onSelect: (date: Date) => void
}

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function BookingCalendar({ selected, onSelect }: BookingCalendarProps) {
  const [viewDate, setViewDate] = useState(startOfMonth(new Date()))
  const today = startOfDay(new Date())

  function buildCalendarDays(): (Date | null)[] {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 })
    const end   = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
    const days: (Date | null)[] = []

    let current = start
    while (current <= end) {
      days.push(current)
      current = addDays(current, 1)
    }
    return days
  }

  const days = buildCalendarDays()
  const isPastMonth = isBefore(endOfMonth(viewDate), today)

  return (
    <div className="bg-brand-green-mid border border-brand-gold/20 p-6 md:p-8">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          disabled={isPastMonth}
          className="w-8 h-8 flex items-center justify-center text-brand-cream-muted hover:text-brand-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Предыдущий месяц"
        >
          <ChevronLeft size={18} />
        </button>

        <h3 className="font-display text-xl text-brand-cream capitalize">
          {format(viewDate, 'LLLL yyyy', { locale: ru })}
        </h3>

        <button
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="w-8 h-8 flex items-center justify-center text-brand-cream-muted hover:text-brand-gold transition-colors"
          aria-label="Следующий месяц"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center font-sans text-brand-gold text-xs tracking-widest uppercase py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} />

          const isCurrentMonth = isSameMonth(day, viewDate)
          const isPast         = isBefore(day, today)
          const isSelected     = selected && isSameDay(day, selected)
          const isToday        = isSameDay(day, today)

          return (
            <button
              key={day.toISOString()}
              onClick={() => !isPast && onSelect(day)}
              disabled={isPast || !isCurrentMonth}
              aria-label={format(day, 'd MMMM yyyy', { locale: ru })}
              aria-pressed={!!isSelected}
              className={[
                'h-9 w-full font-sans text-sm transition-all duration-150',
                isSelected
                  ? 'bg-brand-gold text-brand-green-dark font-semibold'
                  : isToday && !isSelected
                  ? 'border border-brand-gold/60 text-brand-gold'
                  : isPast || !isCurrentMonth
                  ? 'opacity-20 cursor-not-allowed text-brand-cream-muted'
                  : 'text-brand-cream hover:bg-brand-gold/20 hover:text-brand-gold cursor-pointer',
              ].join(' ')}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
