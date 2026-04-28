'use client'

import { useState } from 'react'
import type { BookingDetails } from '@/types'
import Button from '@/components/ui/Button'

interface BookingDetailsFormProps {
  onSubmit: (details: BookingDetails) => void
  loading: boolean
}

export default function BookingDetailsForm({ onSubmit, loading }: BookingDetailsFormProps) {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [guests,  setGuests]  = useState(2)
  const [comment, setComment] = useState('')
  const [errors,  setErrors]  = useState<Partial<Record<'name' | 'phone', string>>>({})

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!name.trim()) newErrors.name = 'Введите ваше имя'
    if (!/^\+?[\d\s\-()]{10,}$/.test(phone)) newErrors.phone = 'Введите корректный номер телефона'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ name: name.trim(), phone: phone.trim(), guests, comment: comment.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-green-mid border border-brand-gold/20 p-6 md:p-8">
      <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-6">
        Ваши данные
      </p>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="font-sans text-brand-cream-muted text-xs uppercase tracking-wider mb-2 block">
            Имя *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="Ваше имя"
            className={`input-field ${errors.name ? 'border-red-500/60' : ''}`}
            autoComplete="name"
          />
          {errors.name && (
            <p className="font-sans text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="font-sans text-brand-cream-muted text-xs uppercase tracking-wider mb-2 block">
            Телефон *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })) }}
            placeholder="+998 90 123 45 67"
            className={`input-field ${errors.phone ? 'border-red-500/60' : ''}`}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="font-sans text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Guests */}
        <div>
          <label className="font-sans text-brand-cream-muted text-xs uppercase tracking-wider mb-3 block">
            Количество гостей
          </label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setGuests(n)}
                className={[
                  'w-10 h-10 font-sans text-sm border transition-all duration-150',
                  guests === n
                    ? 'bg-brand-gold border-brand-gold text-brand-green-dark font-semibold'
                    : 'border-brand-gold/30 text-brand-cream-muted hover:border-brand-gold hover:text-brand-gold',
                ].join(' ')}
                aria-pressed={guests === n}
                aria-label={`${n} гостей`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="font-sans text-brand-cream-muted text-xs uppercase tracking-wider mb-2 block">
            Комментарий (необязательно)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Аллергии, особые пожелания, повод для встречи..."
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          loading={loading}
          className="w-full justify-center mt-2"
        >
          Подтвердить бронирование
        </Button>

        <p className="font-sans text-brand-cream-muted/60 text-xs text-center">
          Нажимая кнопку, вы соглашаетесь с условиями бронирования.
        </p>
      </div>
    </form>
  )
}
