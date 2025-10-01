import Hero from '@/components/sections/hero'
import Benefits from '@/components/sections/benefits'
import Hook from '@/components/sections/hook'
import Story from '@/components/sections/story'
import Products from '@/components/sections/features'
import Reviews from '@/components/sections/reviews'
import Offer from '@/components/sections/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Hook />
      <Story />
      <Products />
      <Reviews />
      <Offer />
    </>
  )
}