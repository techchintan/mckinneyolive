'use client'

import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Web } from '@styled-icons/material/Web'
import { MobileAlt } from '@styled-icons/boxicons-regular/MobileAlt'
import Box from './box'
import Button from './button'
import { getImageUrl, getImageDimensions } from '@/lib/contentful'

const Wrapper = styled(Box)`
  display: flex !important;
  flex-direction: column;
  height: 100%;
  :focus { outline: none; }
`

const Title = styled(Box)`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
`

const Icon = styled(Box)`
  align-items: center;
  display: flex;
  margin-bottom: 6px;
`

function MediaCard({ node, onClick, cardHeight, cardRef, ...rest }: any) {
  const imageUrl = node.image ? getImageUrl(node.image) : ''
  const dims = node.image ? getImageDimensions(node.image) : { width: 400, height: 298 }

  return (
    <Wrapper
      ref={cardRef}
      {...rest}
      style={cardHeight ? { height: `${cardHeight}px` } : {}}
    >
      {imageUrl && (
        <div style={{ width: '100%', height: '298px', position: 'relative', marginBottom: '40px' }}>
          <Image
            src={imageUrl}
            alt={node.title || ''}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      )}
      <Title style={cardHeight ? { marginBottom: 'auto' } : {}} color="primary">
        {node.title}
      </Title>
      <Icon
        href={`https://www.google.com/maps/place/${node.address}`}
        as="a"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Map size="24" /> <Box ml={3}>Directions</Box>
      </Icon>
      <Icon href={node.url} as="a" target="_blank" rel="noopener noreferrer">
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
