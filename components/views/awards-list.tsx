"use client"

import Box from '@/components/ui/box'
import AccordionItem from '@/components/ui/accordion-item'

interface AwardNode {
  id: string
  date: string
  title: string
  content: any
}

interface AwardsListProps {
  awards: { node: AwardNode }[]
  [key: string]: any
}

export default function AwardsList({ awards, ...rest }: AwardsListProps) {
  return (
    <Box {...rest}>
      {awards.map(({ node }) => {
        const { id, date, title, content } = node
        const year = new Date(date).getFullYear().toString()
        return (
          <AccordionItem
            key={id}
            mb={3}
            date={year}
            title={title}
            content={content}
          />
        )
      })}
    </Box>
  )
}
