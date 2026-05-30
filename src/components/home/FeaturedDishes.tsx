'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { buttonVariants } from '@/components/ui/Button'
import { FEATURED_DISHES } from '@/lib/mockData'

const CATEGORY_LINKS: Record<string, string> = {
  'Европейская кухня': '/menu#european',
  'Восточная кухня':   '/menu#eastern',
  'Гриль':             '/menu#grill',
  'Паназия':           '/menu#panasian',
}

export default function FeaturedDishes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-dark">
      <div className="container-site">
        <div className="text-center mb-14">
          <SectionHeader
            eyebrow="Разделы меню"
            heading="Наша кухня"
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {FEATURED_DISHES.map((dish, i) => (
            <Link key={dish.id} href={CATEGORY_LINKS[dish.category] ?? '/menu'}>
            <motion.article
              className="group overflow-hidden bg-brand-green border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase bg-brand-gold/90 text-brand-green-dark px-2 py-1">
                    {dish.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl text-brand-cream leading-snug">
                    {dish.name}
                  </h3>
                  <span className="text-brand-gold/40 group-hover:text-brand-gold transition-colors text-lg shrink-0 mt-0.5">→</span>
                </div>
                <p className="font-sans text-brand-cream-muted text-xs leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link href="/menu" className={buttonVariants({ variant: 'gold', size: 'lg' })}>
            Смотреть полное меню
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
