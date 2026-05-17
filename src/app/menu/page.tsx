import type { Metadata } from 'next'
import MenuContent from './MenuContent'

export const metadata: Metadata = {
  title: 'Меню — Sukoon Cafe',
  description: 'Полное меню Sukoon Cafe: европейская и восточная кухня, паназия, блюда из печи, гриль, напитки.',
}

export default function MenuPage() {
  return <MenuContent />
}
