import { getAsset, getBuildings } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'
import LeasingPageClient from './leasing-client'

export const metadata = {
  title: 'Leasing | McKinney & Olive',
  description: 'Leasing information for McKinney & Olive',
}

export default async function LeasingPage() {
  const [hero, leasingBrochure, buildings, ...leasingImages] = await Promise.all([
    getAsset('hero-leasing'),
    getAsset('leasing-brochure'),
    getBuildings(),
    getAsset('leasing_1'),
    getAsset('leasing_2'),
    getAsset('leasing_3'),
    getAsset('leasing_4'),
    getAsset('leasing_5'),
    getAsset('leasing_6'),
  ])

  const { leasing } = pagesData as any

  return (
    <LeasingPageClient
      leasing={leasing}
      hero={hero}
      leasingBrochure={leasingBrochure}
      buildings={buildings}
      leasingImages={leasingImages}
    />
  )
}
