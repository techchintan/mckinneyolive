import { getAsset, getAnnouncements, getInstagramPosts } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'
import HomePageClient from './home-client'

export const metadata = {
  title: 'Home | McKinney & Olive',
  description: 'McKinney & Olive - Premier office tower in Uptown Dallas',
}

export default async function HomePage() {
  const [hero, bg, defaultImage, announcements, instagramPosts] = await Promise.all([
    getAsset('home_hero'),
    getAsset('bg_place'),
    getAsset('default_image'),
    getAnnouncements(),
    getInstagramPosts().catch(() => []),
  ])

  const { home } = pagesData as any

  return (
    <HomePageClient
      home={home}
      hero={hero}
      bg={bg}
      defaultImage={defaultImage}
      announcements={announcements}
      instagramPosts={instagramPosts}
    />
  )
}
