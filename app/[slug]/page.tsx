import { notFound } from 'next/navigation'
import { Container } from 'styled-bootstrap-grid'
import { getAsset, getNewsBySlug, getAllNewsSlugs } from '@/lib/contentful'
import SingleNewsClient from './single-news-client'

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return { title: 'Not Found' }
  return {
    title: `${article.title} - News | McKinney & Olive`,
    description: `${article.title} - McKinney & Olive News`,
  }
}

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, hero] = await Promise.all([
    getNewsBySlug(slug),
    getAsset('hero_news'),
  ])

  if (!article) notFound()

  return <SingleNewsClient article={article} hero={hero} />
}
