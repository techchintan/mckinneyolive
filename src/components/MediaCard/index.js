import React from 'react'
import { isNull } from 'lodash'
import { Map } from 'styled-icons/boxicons-solid/Map'
import { Web } from 'styled-icons/material/Web'
import { MobileAlt } from 'styled-icons/boxicons-regular/MobileAlt'

import Box from '../Box'
import Button from '../Button'

import { Wrapper, Img, Title, Icon } from './styles'

function MediaCard({ context, node, onClick, cardHeight, cardRef, ...rest }) {
  const truncate = (str, limit) =>
    str.length > limit ? `${str.substring(0, limit)}...` : str

  let fluid
  if (!isNull(node.image)) fluid = node.image.fluid
  else fluid = ''

  return (
    <Wrapper
      ref={cardRef}
      {...rest}
      style={cardHeight ? { height: `${cardHeight}px` } : {}}
    >
      <Img fluid={fluid} />
      <Title style={cardHeight ? { marginBottom: `auto` } : {}} color="primary">
        {/* {truncate(node.title, 41)} */}
        {node.title}
      </Title>
      <Icon
        href={`https://www.google.com/maps/place/${node.address}`}
        as="a"
        target="_blank"
      >
        <Map size="24" /> <Box ml={3}>Directions</Box>
      </Icon>
      <Icon href={node.url} as="a" target="_blank">
        <Web size="24" /> <Box ml={3}>Website</Box>
      </Icon>
      <Icon href={`tel:${node.phone}`} as="a">
        <MobileAlt size="24" />
        <Box ml={3} display={['block', 'block', 'none']}>
          Call Us
        </Box>
        <Box ml={3} display={['none', 'none', 'block']}>
          {node.phone}
        </Box>
      </Icon>
      <Button mt={3} onClick={onClick}>
        Read More
      </Button>
    </Wrapper>
  )
}

export default MediaCard
