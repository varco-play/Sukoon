'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, Send } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/icons'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  RESTAURANT_PHONE,
  RESTAURANT_ADDRESS,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  WORKING_HOURS,
} from '@/lib/config'

export default function Location() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-green-mid">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative h-80 md:h-96 bg-brand-green border border-brand-gold/20 overflow-hidden">
              {/* Placeholder for Google Maps iframe */}
              <iframe
                title="Sukoon Cafe на карте"
                src="https://maps.google.com/maps?q=Tashkent+Amir+Temur+107&t=m&z=15&output=embed&iwloc=near"
                className="w-full h-full grayscale opacity-70 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Dark green tint overlay to match brand */}
              <div className="absolute inset-0 bg-brand-green/10 pointer-events-none" />
              {/* Gold corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-gold/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-gold/60 pointer-events-none" />
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <SectionHeader
              eyebrow="Как нас найти"
              heading="Контакты"
            />

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-1">Адрес</p>
                  <p className="font-sans text-brand-cream text-sm leading-relaxed">{RESTAURANT_ADDRESS}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 border border-brand-gold/30 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-1">Телефон</p>
                  <a
                    href={`tel:${RESTAURANT_PHONE.replace(/\s/g, '')}`}
                    className="font-sans text-brand-cream text-sm hover:text-brand-gold transition-colors"
                  >
                    {RESTAURANT_PHONE}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={14} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mb-2">Часы работы</p>
                  <div className="space-y-1">
                    {WORKING_HOURS.map((wh) => (
                      <div key={wh.days} className="flex justify-between gap-8 font-sans text-sm">
                        <span className="text-brand-cream-muted">{wh.days}</span>
                        <span className="text-brand-cream">{wh.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-4 pt-4 border-t border-brand-gold/15">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm text-brand-cream-muted hover:text-brand-gold transition-colors"
                >
                  <InstagramIcon size={16} />
                  Instagram
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm text-brand-cream-muted hover:text-brand-gold transition-colors"
                >
                  <Send size={16} />
                  Telegram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
