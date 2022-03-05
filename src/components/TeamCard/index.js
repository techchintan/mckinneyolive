import React from 'react'
import { isNull } from 'lodash'
import { getImage } from 'gatsby-plugin-image'
import Box from '../Box'
import Heading from '../Heading'
import { Image, Position } from './styles'

function TeamCard({ name, position, email, phone, image, noImage, ...rest }) {
  let fluid
  if (!isNull(image)) fluid = image
  else fluid = noImage

  return (
    <Box {...rest}>
      <Image image={getImage(fluid)} alt={name} />
      <Heading
        fontSize="24px"
        mb={0}
        style={{ textTransform: 'capitalize' }}
        dangerouslySetInnerHTML={{ __html: name }}
      />
      <Position mb={3} color="grays.0">
        {position}
      </Position>
    </Box>
  )
}

export default TeamCard
