import { getAsset, getNews, getYearCategories, getAnnouncements, getAwards } from '@/lib/contentful'
import NewsPageClient from './news-client'

export const metadata = {
  title: 'News | McKinney & Olive',
  description: 'Latest news from McKinney & Olive',
}

export default async function NewsPage() {
  const [hero, defaultImage, yearCategories, news, announcements, awards] = await Promise.all([
    getAsset('hero_news'),
    getAsset('default_image'),
    getYearCategories(),
    getNews(),
    getAnnouncements(),
    getAwards(),
  ])

  return (
    <NewsPageClient
      hero={hero}
      defaultImage={defaultImage}
      yearCategories={yearCategories}
      news={news}
      announcements={announcements}
      awards={awards}
    />
  )
}
