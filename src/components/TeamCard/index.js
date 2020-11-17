import React from 'react'
import { isNull } from 'lodash'
import { Envelope } from 'styled-icons/fa-solid/Envelope'
import { PhoneAlt } from 'styled-icons/fa-solid/PhoneAlt'

import Box from '../Box'
import Heading from '../Heading'

import { Image, Position, Email, Phone } from './styles'

function TeamCard({ name, position, email, phone, image, noImage, ...rest }) {
  let fluid
  if (!isNull(image)) fluid = image.fluid
  else fluid = noImage.childImageSharp.fluid

  return (
    <Box {...rest}>
      <Image fluid={fluid} />
      <Heading
        fontSize="24px"
        mb={0}
        style={{ textTransform: 'capitalize' }}
        dangerouslySetInnerHTML={{ __html: name }}
      />
      <Position mb={3} color="grays.0">
        {position}
      </Position>
      <Email mb={2} color="secondary" href={`mailto:${email}`}>
        <Envelope /> {email}
      </Email>
      <Phone color="secondary" href={`tel:${phone}`}>
        <PhoneAlt /> {phone}
      </Phone>
    </Box>
  )
}

export default TeamCard
