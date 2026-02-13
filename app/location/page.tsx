import { getAsset } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'
import LocationPageClient from './location-client'

export const metadata = {
  title: 'Location | McKinney & Olive',
  description: 'Find us at McKinney & Olive in Uptown Dallas',
}

export default async function LocationPage() {
  const hero = await getAsset('hero_locations')
  const { location } = pagesData as any

  return <LocationPageClient location={location} hero={hero} />
}
