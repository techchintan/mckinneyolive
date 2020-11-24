import React from 'react'
import moment from 'moment'
import { Link } from 'gatsby'

import Box from '../../components/Box'
import NewsItem, { Date, Title } from '../../components/NewsItem'

function NewsList({ news, ...rest }) {
  return (
    <Box {...rest}>
      {news.map(({ node }) => {
        const { id, title, date, slug } = node
        return (
          <NewsItem key={id} mb={3}>
            <Date>{moment.parseZone(date).format('MMM DD')}</Date>
            <Title color="secondary">
              <Link to={`/${slug}/#content-start`}>{title}</Link>
            </Title>
          </NewsItem>
        )
      })}
    </Box>
  )
}

export default NewsList
