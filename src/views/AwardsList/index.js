import React from 'react'
import moment from 'moment'
import Box from '../../components/Box'
import AccordionItem from '../../components/AccordionItem'

function AwardsList({ awards, ...rest }) {
  return (
    <Box {...rest}>
      {awards.map(({ node }) => {
        const { id, date, title, content } = node
        return (
          <AccordionItem
            key={id}
            mb={3}
            date={moment.parseZone(date).format('YYYY')}
            title={title}
            content={content}
          />
        )
      })}
    </Box>
  )
}

export default AwardsList
