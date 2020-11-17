import React from 'react'
import moment from 'moment'

import Box from '../../components/Box'
import NewsItem, { Date, Title } from '../../components/NewsItem'

function AnnouncementList({ announcements, onClick, ...rest }) {
  return (
    <Box {...rest}>
      {announcements.map(({ node }) => {
        const { id, title, date } = node
        return (
          <NewsItem key={id} mb={3}>
            <Date>{moment.parseZone(date).format('MMM DD')}</Date>
            <Title color="secondary" onClick={() => onClick(node)}>
              {title}
            </Title>
          </NewsItem>
        )
      })}
    </Box>
  )
}

export default AnnouncementList
