'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { TimeSlot } from '@/types'

interface TimeSlotGridProps {
  date: Date
  selected: string | null
  onSelect: (time: string) => void
}

export default function TimeSlotGrid({ date, selected, onSelect }: TimeSlotGridProps) {
  const [slots, setSlots]   = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!date) return
    const dateStr = format(date, 'yyyy-MM-dd')

    setLoading(true)
    setError(null)

    fetch(`/api/availability?date=${dateStr}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки')
        return res.json()
      })
      .then((data: { slots: TimeSlot[] }) => setSlots(data.slots))
      .catch(() => setError('Не удалось загрузить доступное время. Попробуйте ещё раз.'))
      .finally(() => setLoading(false))
  }, [date])

  const availableSlots = slots.filter((s) => s.available)

  if (loading) {
    return (
      <div className="bg-brand-green-mid border border-brand-gold/20 p-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-brand-green animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-brand-green-mid border border-brand-gold/20 p-8 text-center">
        <p className="text-brand-cream-muted font-sans text-sm mb-4">{error}</p>
        <button
          onClick={() => {
            const dateStr = format(date, 'yyyy-MM-dd')
            setLoading(true)
            setError(null)
            fetch(`/api/availability?date=${dateStr}`)
              .then((r) => r.json())
              .then((d) => setSlots(d.slots))
              .catch(() => setError('Ошибка. Попробуйте обновить страницу.'))
              .finally(() => setLoading(false))
          }}
          className="font-sans text-brand-gold text-sm border border-brand-gold/30 px-4 py-2 hover:bg-brand-gold/10 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  if (availableSlots.length === 0) {
    return (
      <div className="bg-brand-green-mid border border-brand-gold/20 p-10 text-center">
        <div className="w-12 h-px bg-brand-gold/40 mx-auto mb-4" />
        <p className="font-display text-xl text-brand-cream mb-2">На этот день нет мест</p>
        <p className="font-sans text-brand-cream-muted text-sm">
          Пожалуйста, выберите другую дату.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-green-mid border border-brand-gold/20 p-6 md:p-8">
      <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-5">
        Доступное время — {format(date, 'd MMMM', { locale: ru })}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => {
          const isSelected = selected === slot.start

          if (!slot.available) {
            return (
              <div
                key={slot.start}
                className="h-12 flex flex-col items-center justify-center border border-brand-green opacity-30 cursor-not-allowed"
                title="Занято"
              >
                <span className="font-sans text-xs text-brand-cream-muted line-through">{slot.start}</span>
              </div>
            )
          }

          return (
            <button
              key={slot.start}
              onClick={() => onSelect(slot.start)}
              aria-pressed={isSelected}
              className={[
                'h-12 flex flex-col items-center justify-center border font-sans text-sm transition-all duration-200',
                isSelected
                  ? 'bg-brand-gold border-brand-gold text-brand-green-dark font-semibold shadow-gold-glow'
                  : 'border-brand-gold/40 text-brand-cream hover:border-brand-gold hover:text-brand-gold hover:shadow-gold-glow',
              ].join(' ')}
            >
              {slot.start}
            </button>
          )
        })}
      </div>

      <p className="font-sans text-brand-cream-muted/60 text-xs mt-5">
        Слот бронирования — 30 минут. Вы можете прийти в любое время в течение этого окна.
      </p>
    </div>
  )
}
