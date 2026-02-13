import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Box from './box'
import Heading from './heading'
import { getImageUrl } from '@/lib/contentful'

const StyledImage = styled.div`
  margin-bottom: 20px;
  height: 370px;
  width: 100%;
  position: relative;
  overflow: hidden;
`

const Position = styled(Box)`
  text-transform: uppercase;
`

function TeamCard({ name, position, image, noImageUrl, ...rest }: any) {
  const imageUrl = image ? getImageUrl(image) : noImageUrl || ''

  return (
    <Box {...rest}>
      {imageUrl && (
        <StyledImage>
          <Image
            src={imageUrl}
            alt={name || ''}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        </StyledImage>
      )}
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
