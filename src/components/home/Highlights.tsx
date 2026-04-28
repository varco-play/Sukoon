'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UtensilsCrossed, Music2, Leaf } from 'lucide-react'

const pillars = [
  {
    Icon:  UtensilsCrossed,
    title: 'Авторская кухня',
    body:  'Сезонные продукты. Рецепты, созданные с любовью к деталям. Каждое блюдо — диалог традиции и современности.',
  },
  {
    Icon:  Music2,
    title: 'Живая музыка',
    body:  'Каждую пятницу и субботу вечером — живые выступления, создающие неповторимую атмосферу вечера.',
  },
  {
    Icon:  Leaf,
    title: 'Атмосфера покоя',
    body:  'Пространство, в котором время замедляется. Мягкое освещение, тихая музыка, продуманный интерьер.',
  },
]

export default function Highlights() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-green-dark">
      <div className="container-site">
        {/* Section label */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase">
            Почему Sukoon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-gold/10">
          {pillars.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              className="bg-brand-green-dark p-10 md:p-12 flex flex-col items-center text-center group hover:bg-brand-green-mid transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              {/* Gold accent bar */}
              <div className="w-8 h-px bg-brand-gold mb-6 group-hover:w-16 transition-all duration-500" />
              <Icon className="text-brand-gold mb-5" size={28} strokeWidth={1.5} />
              <h3 className="font-display text-xl text-brand-cream mb-3">{title}</h3>
              <p className="font-sans text-brand-cream-muted text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
