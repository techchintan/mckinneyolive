"use client"

import Link from 'next/link'
import Box from '@/components/ui/box'
import NewsItem, { DateLabel, Title } from '@/components/ui/news-item'

interface NewsNode {
  id: string
  title: string
  date: string
  slug: string
}

interface NewsListProps {
  news: { node: NewsNode }[]
  [key: string]: any
}

export default function NewsList({ news, ...rest }: NewsListProps) {
  return (
    <Box {...rest}>
      {news.map(({ node }) => {
        const { id, title, date, slug } = node
        const formatted = new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        return (
          <NewsItem key={id} mb={3}>
            <DateLabel>{formatted}</DateLabel>
            <Title color="secondary">
              <Link href={`/${slug}/#content-start`}>{title}</Link>
            </Title>
          </NewsItem>
        )
      })}
    </Box>
  )
}
