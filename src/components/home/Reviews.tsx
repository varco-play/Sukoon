'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { MOCK_REVIEWS } from '@/lib/mockData'

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-dark">
      <div className="container-site">
        <div className="text-center mb-14">
          <SectionHeader
            eyebrow="Отзывы гостей"
            heading="Они уже были у нас"
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review, i) => (
            <motion.article
              key={review.id}
              className="bg-brand-green-mid border border-brand-gold/15 p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className={si < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-green'}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-base md:text-lg text-brand-cream mb-6 italic leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-gold/15">
                <div className="w-8 h-px bg-brand-gold/50" />
                <p className="font-sans text-brand-gold text-sm">{review.name}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
