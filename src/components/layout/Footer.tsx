import Link from 'next/link'
import Image from 'next/image'
import { Send, MapPin, Phone, Clock } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/icons'
import {
  LOGO_GOLD_FILTER,
  RESTAURANT_ADDRESS,
  RESTAURANT_PHONE,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  WORKING_HOURS,
} from '@/lib/config'

const NAV_LINKS = [
  { href: '/',            label: 'Главная' },
  { href: '/menu',        label: 'Меню' },
  { href: '/reservation', label: 'Бронирование' },
  { href: '/contact',     label: 'Контакты' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gold/15">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo/sukoon-logo.jpg"
                  alt="Sukoon"
                  fill
                  sizes="40px"
                  className="object-contain"
                  style={{ filter: LOGO_GOLD_FILTER }}
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-brand-gold text-xl">Sukoon</span>
                <span className="font-sans text-brand-cream-muted text-[10px] tracking-[0.2em] uppercase -mt-0.5">cafe</span>
              </div>
            </Link>
            <p className="font-display text-brand-cream-muted text-base italic leading-relaxed max-w-xs">
              Место, где время замедляется.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-brand-gold/30 flex items-center justify-center text-brand-cream-muted hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 border border-brand-gold/30 flex items-center justify-center text-brand-cream-muted hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
              >
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Nav column */}
          <div>
            <p className="font-sans text-brand-gold text-xs tracking-[0.3em] uppercase mb-5">Навигация</p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-brand-cream-muted hover:text-brand-cream transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="font-sans text-brand-gold text-xs tracking-[0.3em] uppercase mb-5">Контакты</p>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${RESTAURANT_PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-brand-cream-muted hover:text-brand-cream transition-colors duration-200 group"
              >
                <Phone size={14} className="text-brand-gold shrink-0" />
                <span className="font-sans text-sm">{RESTAURANT_PHONE}</span>
              </a>
              <div className="flex items-start gap-3 text-brand-cream-muted">
                <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="font-sans text-sm leading-relaxed">{RESTAURANT_ADDRESS}</span>
              </div>
              <div className="flex items-start gap-3 text-brand-cream-muted">
                <Clock size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {WORKING_HOURS.map((wh) => (
                    <span key={wh.days} className="font-sans text-sm">
                      {wh.days}: <span className="text-brand-cream">{wh.hours}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-gold/10">
        <div className="container-site py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-sans text-brand-cream-muted text-xs tracking-wide">
            © {new Date().getFullYear()} Sukoon Cafe. Все права защищены.
          </p>
          <p className="font-sans text-brand-cream-muted/50 text-xs">
            Ташкент, Узбекистан
          </p>
        </div>
      </div>
    </footer>
  )
}
