"use client"

import Box from '@/components/ui/box'
import NewsItem, { DateLabel, Title } from '@/components/ui/news-item'

interface AnnouncementNode {
  id: string
  title: string
  date: string
  content?: any
  time?: string
  location?: string
  image?: any
  announcementDateTimestamp?: number
}

interface AnnouncementsListProps {
  announcements: { node: AnnouncementNode }[]
  onClick: (node: AnnouncementNode) => void
  [key: string]: any
}

export default function AnnouncementsList({ announcements, onClick, ...rest }: AnnouncementsListProps) {
  return (
    <Box {...rest}>
      {announcements.map(({ node }) => {
        const { id, title, date } = node
        const formatted = new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        return (
          <NewsItem key={id} mb={3}>
            <DateLabel>{formatted}</DateLabel>
            <Title color="secondary" onClick={() => onClick(node)} style={{ cursor: 'pointer' }}>
              {title}
            </Title>
          </NewsItem>
        )
      })}
    </Box>
  )
}
