import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Highlights from '@/components/home/Highlights'
import FeaturedDishes from '@/components/home/FeaturedDishes'
import Gallery from '@/components/home/Gallery'
import ReservationCTA from '@/components/home/ReservationCTA'
import Reviews from '@/components/home/Reviews'
import Location from '@/components/home/Location'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <FeaturedDishes />
      <Gallery />
      <ReservationCTA />
      <Reviews />
      <Location />
    </>
  )
}
