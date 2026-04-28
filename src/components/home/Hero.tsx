'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { LOGO_GOLD_FILTER } from '@/lib/config'
import { buttonVariants } from '@/components/ui/Button'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const item: any = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
          alt="Sukoon Cafe интерьер"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Multi-layer overlay for depth — inspired by Josephine's approach */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/75 via-brand-green-dark/55 to-brand-dark/90" />
      <div className="absolute inset-0 z-10 bg-brand-green-dark/30" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Logo mark */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <div className="relative h-20 w-20">
            <Image
              src="/logo/sukoon-logo.jpg"
              alt="Sukoon"
              fill
              sizes="80px"
              className="object-contain drop-shadow-2xl"
              style={{ filter: LOGO_GOLD_FILTER }}
            />
          </div>
        </motion.div>

        {/* Location eyebrow */}
        <motion.p
          variants={item}
          className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase mb-5"
        >
          Ташкент · Узбекистан
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-cream leading-none mb-6"
        >
          Место, где время
          <br />
          <span className="text-brand-gold italic">замедляется</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div variants={item} className="flex items-center gap-4 justify-center mb-6">
          <div className="h-px w-16 bg-brand-gold/50" />
          <span className="text-brand-gold text-xs">◆</span>
          <div className="h-px w-16 bg-brand-gold/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-sans text-brand-cream-muted text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10"
        >
          Авторская кухня. Живая музыка. Атмосфера спокойствия.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservation" className={buttonVariants({ variant: 'gold', size: 'lg' })}>
            Забронировать стол
          </Link>
          <Link href="/menu" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Посмотреть меню
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="font-sans text-brand-cream-muted/60 text-[10px] tracking-[0.3em] uppercase">Прокрутить</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-brand-gold/70" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
