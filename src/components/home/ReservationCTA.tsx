import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/Button'
import GoldDivider from '@/components/ui/GoldDivider'

export default function ReservationCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background image with strong dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80"
          alt="Бронирование стола в Sukoon"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-brand-dark/80" />
      <div className="absolute inset-0 z-10 bg-brand-green-dark/50" />
      {/* Botanical overlay */}
      <div className="absolute inset-0 z-10 bg-botanical opacity-[0.06] pointer-events-none" />

      <div className="relative z-20 text-center px-4 max-w-2xl mx-auto">
        <GoldDivider ornament className="max-w-xs mx-auto mb-10" />

        <p className="font-sans text-brand-gold text-xs tracking-[0.4em] uppercase mb-4">
          Забронируйте стол
        </p>

        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-cream leading-tight mb-5">
          Создайте незабываемый вечер
        </h2>

        <p className="font-sans text-brand-cream-muted text-base md:text-lg leading-relaxed mb-10">
          Для вас и ваших близких. Каждый вечер в Sukoon — это особый момент.
        </p>

        <Link href="/reservation" className={buttonVariants({ variant: 'gold', size: 'lg' })}>
          Забронировать сейчас
        </Link>

        <GoldDivider ornament className="max-w-xs mx-auto mt-10" />
      </div>
    </section>
  )
}
