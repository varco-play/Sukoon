'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Send, ChevronDown, Mail } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/icons'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  RESTAURANT_PHONE,
  RESTAURANT_ADDRESS,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  WORKING_HOURS,
} from '@/lib/config'

const FAQ = [
  {
    q: 'Нужно ли бронировать стол заранее?',
    a: 'Бронирование рекомендуется, особенно в выходные дни и праздники. В будние дни мы стараемся принимать гостей без предварительной записи, однако наличие мест не гарантируется.',
  },
  {
    q: 'Есть ли дресс-код?',
    a: 'Мы приветствуем smart casual — опрятный, стильный образ. Мы не устанавливаем строгих требований, однако просим гостей одеваться соответствующе атмосфере заведения.',
  },
  {
    q: 'Принимаете ли вы банковские карты?',
    a: 'Да, мы принимаем все основные банковские карты, а также наличные. Оплата через QR-код также доступна.',
  },
  {
    q: 'Есть ли у вас детское меню?',
    a: 'Да, у нас есть специальное меню для детей. Также мы будем рады предоставить детские стульчики по запросу.',
  },
  {
    q: 'Проводите ли вы корпоративные мероприятия и банкеты?',
    a: 'Да, мы организуем частные ужины, корпоративные встречи и банкеты. Свяжитесь с нами по телефону или в социальных сетях для обсуждения деталей.',
  },
]

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-brand-gold/15">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-brand-cream group-hover:text-brand-gold transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-brand-gold shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-sans text-brand-cream-muted text-sm leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-brand-green-dark pt-24">

      {/* Hero strip */}
      <div className="bg-brand-green-dark py-16 border-b border-brand-gold/10">
        <div className="container-site text-center">
          <p className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase mb-3">Свяжитесь с нами</p>
          <h1 className="font-display text-5xl md:text-6xl text-brand-cream mb-4">Контакты</h1>
          <GoldDivider ornament className="max-w-xs mx-auto" />
        </div>
      </div>

      {/* Map + contact info */}
      <section className="section bg-brand-green-dark">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Map */}
            <div className="relative h-80 md:h-96 border border-brand-gold/20 overflow-hidden">
              <iframe
                title="Sukoon Cafe на карте"
                src="https://maps.google.com/maps?q=Tashkent+Amir+Temur&t=m&z=14&output=embed&iwloc=near"
                className="w-full h-full grayscale opacity-60 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-brand-green/10 pointer-events-none" />
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-gold/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-gold/60 pointer-events-none" />
            </div>

            {/* Contacts */}
            <div>
              <SectionHeader eyebrow="Как нас найти" heading="Адрес и контакты" />

              <div className="space-y-6">
                <ContactRow icon={MapPin} label="Адрес">
                  <p className="font-sans text-brand-cream text-sm leading-relaxed">{RESTAURANT_ADDRESS}</p>
                </ContactRow>

                <ContactRow icon={Phone} label="Телефон">
                  <a
                    href={`tel:${RESTAURANT_PHONE.replace(/\s/g, '')}`}
                    className="font-sans text-brand-cream text-sm hover:text-brand-gold transition-colors"
                  >
                    {RESTAURANT_PHONE}
                  </a>
                </ContactRow>

                <ContactRow icon={Mail} label="Email">
                  <a
                    href="mailto:info@sukooncafe.uz"
                    className="font-sans text-brand-cream text-sm hover:text-brand-gold transition-colors"
                  >
                    info@sukooncafe.uz
                  </a>
                </ContactRow>

                <ContactRow icon={Clock} label="Часы работы">
                  <div className="space-y-1">
                    {WORKING_HOURS.map((wh) => (
                      <div key={wh.days} className="flex flex-col sm:flex-row sm:justify-between gap-1 font-sans text-sm">
                        <span className="text-brand-cream-muted">{wh.days}</span>
                        <span className="text-brand-cream">{wh.hours}</span>
                      </div>
                    ))}
                  </div>
                </ContactRow>

                {/* Social */}
                <div className="pt-4 border-t border-brand-gold/15 flex gap-4">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-brand-gold/30 px-4 py-2.5 font-sans text-sm text-brand-cream-muted hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
                  >
                    <InstagramIcon size={15} />
                    Instagram
                  </a>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-brand-gold/30 px-4 py-2.5 font-sans text-sm text-brand-cream-muted hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
                  >
                    <Send size={15} />
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm bg-brand-green-mid border-t border-brand-gold/10">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <SectionHeader eyebrow="Вопросы и ответы" heading="FAQ" centered />
          </div>

          <div>
            {FAQ.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                open={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>

          <p className="font-sans text-brand-cream-muted text-sm text-center mt-10">
            Не нашли ответ?{' '}
            <a
              href={`tel:${RESTAURANT_PHONE.replace(/\s/g, '')}`}
              className="text-brand-gold hover:text-brand-gold-light underline underline-offset-2 transition-colors"
            >
              Позвоните нам
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-brand-gold" />
      </div>
      <div>
        <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-1">{label}</p>
        {children}
      </div>
    </div>
  )
}
