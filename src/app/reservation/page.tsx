'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { CalendarCheck } from 'lucide-react'
import BookingSteps from '@/components/reservation/BookingSteps'
import BookingCalendar from '@/components/reservation/BookingCalendar'
import TimeSlotGrid from '@/components/reservation/TimeSlotGrid'
import BookingDetailsForm from '@/components/reservation/BookingDetailsForm'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import type { BookingDetails } from '@/types'

type Step = 1 | 2 | 3 | 'success'

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

export default function ReservationPage() {
  const [step,      setStep]      = useState<Step>(1)
  const [direction, setDirection] = useState(1) // 1=forward, -1=backward
  const [date,      setDate]      = useState<Date | null>(null)
  const [time,      setTime]      = useState<string | null>(null)
  const [booking,   setBooking]   = useState<(BookingDetails & { date: string; time: string }) | null>(null)
  const [loading,   setLoading]   = useState(false)

  function goToStep(next: Step) {
    const current = typeof step === 'number' ? step : 4
    const nextNum  = typeof next  === 'number' ? next  : 4
    setDirection(nextNum > current ? 1 : -1)
    setStep(next)
  }

  async function handleSubmitDetails(details: BookingDetails) {
    if (!date || !time) return
    setLoading(true)

    const dateStr = format(date, 'yyyy-MM-dd')

    try {
      const res = await fetch('/api/reservations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ date: dateStr, time, ...details }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Ошибка при бронировании')
        return
      }

      setBooking({ ...details, date: dateStr, time })
      goToStep('success')
      toast.success('Бронирование подтверждено!')
    } catch {
      toast.error('Ошибка соединения. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-green-dark pt-28 pb-20">
      <div className="container-site max-w-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase mb-3">
            Sukoon Cafe
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-brand-cream mb-3">
            Бронирование стола
          </h1>
          <GoldDivider ornament className="max-w-xs mx-auto" />
        </div>

        {step !== 'success' && (
          <BookingSteps currentStep={step as 1 | 2 | 3} />
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* STEP 1: Date */}
            {step === 1 && (
              <div>
                <p className="font-sans text-brand-cream-muted text-sm mb-4 text-center">
                  Выберите дату вашего визита
                </p>
                <BookingCalendar
                  selected={date}
                  onSelect={(d) => { setDate(d); setTime(null) }}
                />
                <div className="mt-5">
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={() => date && goToStep(2)}
                    disabled={!date}
                    className="w-full justify-center"
                  >
                    Далее — выбор времени
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Time */}
            {step === 2 && date && (
              <div>
                <p className="font-sans text-brand-cream-muted text-sm mb-4 text-center">
                  {format(date, 'd MMMM yyyy', { locale: ru })} — выберите удобное время
                </p>
                <TimeSlotGrid
                  date={date}
                  selected={time}
                  onSelect={setTime}
                />
                <div className="flex gap-3 mt-5">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => goToStep(1)}
                    className="flex-1 justify-center"
                  >
                    Назад
                  </Button>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => time && goToStep(3)}
                    disabled={!time}
                    className="flex-2 justify-center flex-1"
                  >
                    Далее — детали
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && date && time && (
              <div>
                {/* Booking summary banner */}
                <div className="bg-brand-green border border-brand-gold/20 px-5 py-3 mb-5 flex items-center justify-between">
                  <div className="font-sans text-sm">
                    <span className="text-brand-cream-muted">Дата: </span>
                    <span className="text-brand-cream">{format(date, 'd MMMM', { locale: ru })}</span>
                    <span className="mx-2 text-brand-gold/40">·</span>
                    <span className="text-brand-cream-muted">Время: </span>
                    <span className="text-brand-gold">{time}</span>
                  </div>
                  <button
                    onClick={() => goToStep(2)}
                    className="font-sans text-xs text-brand-cream-muted hover:text-brand-gold transition-colors underline underline-offset-2"
                  >
                    изменить
                  </button>
                </div>

                <BookingDetailsForm onSubmit={handleSubmitDetails} loading={loading} />

                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(2)}
                    className="text-brand-cream-muted hover:text-brand-cream text-xs"
                  >
                    ← Назад к выбору времени
                  </Button>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {step === 'success' && booking && (
              <div className="text-center py-8">
                {/* Animated checkmark */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 border border-brand-gold flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <CalendarCheck className="text-brand-gold" size={28} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h2 className="font-display text-3xl md:text-4xl text-brand-cream mb-2">
                    Бронирование подтверждено
                  </h2>
                  <p className="font-sans text-brand-cream-muted text-sm mb-8">
                    Ждём вас в Sukoon Cafe. До встречи!
                  </p>

                  <GoldDivider ornament className="max-w-xs mx-auto mb-8" />

                  {/* Booking details summary */}
                  <div className="bg-brand-green-mid border border-brand-gold/20 p-6 text-left space-y-3 mb-8">
                    {[
                      { label: 'Дата',   value: format(parse(booking.date, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy', { locale: ru }) },
                      { label: 'Время',  value: booking.time },
                      { label: 'Гостей', value: `${booking.guests} чел.` },
                      { label: 'Имя',    value: booking.name },
                      { label: 'Телефон', value: booking.phone },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between font-sans text-sm">
                        <span className="text-brand-cream-muted">{label}</span>
                        <span className="text-brand-cream">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button href="/" variant="gold" size="lg">
                    Вернуться на главную
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
