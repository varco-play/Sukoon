import type { Metadata } from 'next'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import GoldDivider from '@/components/ui/GoldDivider'
import { buttonVariants } from '@/components/ui/Button'
import { LOGO_GOLD_FILTER } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Меню — Sukoon Cafe',
  description: 'Авторская кухня Sukoon Cafe. Ознакомьтесь с нашим меню.',
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-brand-green-dark flex flex-col relative overflow-hidden">
      {/* Botanical background */}
      <div className="absolute inset-0 bg-botanical opacity-[0.06] pointer-events-none" />

      {/* Background image with deep overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1920&q=80"
          alt="Меню Sukoon"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-brand-dark/85" />
      <div className="absolute inset-0 z-10 bg-brand-green-dark/60" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 py-32 text-center">
        {/* Logo */}
        <div className="relative h-20 w-20 mb-8">
          <Image
            src="/logo/sukoon-logo.jpg"
            alt="Sukoon"
            fill
            sizes="80px"
            className="object-contain"
            style={{ filter: LOGO_GOLD_FILTER }}
          />
        </div>

        <GoldDivider ornament className="max-w-48 mx-auto mb-8" />

        <p className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase mb-4">
          Sukoon Cafe
        </p>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-cream mb-5 leading-tight">
          Наше меню
        </h1>

        <p className="font-sans text-brand-cream-muted text-base md:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Авторская кухня, вдохновлённая традициями Востока и современными гастрономическими тенденциями. Каждое блюдо создано с заботой и уважением к продукту.
        </p>

        <a
          href="/menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'gold', size: 'lg' })}
        >
          <FileText size={18} />
          Открыть меню
        </a>

        <p className="font-sans text-brand-cream-muted/60 text-xs mt-5 tracking-wide">
          Откроется в новой вкладке · PDF
        </p>

        <GoldDivider ornament className="max-w-48 mx-auto mt-12" />

        {/* Quick category hints */}
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {['Закуски', 'Горячее', 'Рыба и морепродукты', 'Десерты', 'Напитки'].map((cat) => (
            <span key={cat} className="font-sans text-xs tracking-widest uppercase text-brand-cream-muted/70">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
