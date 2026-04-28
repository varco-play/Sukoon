'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-green-mid relative overflow-hidden">
      {/* Subtle botanical overlay */}
      <div className="absolute inset-0 bg-botanical opacity-[0.04] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeader
              eyebrow="Наша история"
              heading="О нас"
              subheading="Sukoon — слово, означающее покой и умиротворение на языке Востока."
            />
            <div className="space-y-4 text-brand-cream-muted font-sans text-sm md:text-base leading-relaxed">
              <p>
                В сердце Ташкента мы создали пространство, где каждая деталь продумана: от сервировки стола до последних нот вечерней музыки. Здесь нет суеты — только тепло, вкус и атмосфера.
              </p>
              <p>
                Наша кухня вдохновлена богатством восточной традиции и современными гастрономическими тенденциями. Мы работаем только с сезонными продуктами и чтим ремесло в каждом блюде.
              </p>
              <p>
                Sukoon — это не просто ресторан. Это место, куда хочется возвращаться.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-brand-gold/20">
              {[
                { value: '2021', label: 'Год основания' },
                { value: '8+',   label: 'Лет опыта кухни' },
                { value: '★4.9', label: 'Средняя оценка' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl text-brand-gold">{stat.value}</p>
                  <p className="font-sans text-brand-cream-muted text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            {/* Decorative gold frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-brand-gold/25 z-0" />
            <div className="relative z-10 overflow-hidden aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80"
                alt="Атмосфера Sukoon Cafe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/40 to-transparent" />
            </div>
            {/* Small accent image */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-40 md:h-40 overflow-hidden border-4 border-brand-green-mid z-20">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80"
                alt="Детали интерьера"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
