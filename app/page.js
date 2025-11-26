import Hero from '@/components/Hero/page';
import LatestCollection from '@/components/LatestCollection/page';
import BestSeller from '@/components/BestSeller/page';
import OurPolicy from '@/components/OurPolicy/page'
import NewsletterBox from '@/components/NewsletterBox/page'
export default function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}
