'use client'

import React from 'react'
import NextImage from 'next/image'
import styled from 'styled-components'
import mediaQuery from '@/lib/utils/media-query'
import Box from '@/components/ui/box'

const Content = styled(Box)`
  flex: 1;
  ${mediaQuery.minDesktop} {
    flex: unset;
  }
`

Content.defaultProps = {
  p: [4, 5, 5, 6],
  width: [1, null, '50%'],
}

const ImageWrapper = styled(Box)`
  width: 100%;
  height: 320px;
  position: relative;
  ${mediaQuery.minTablet} {
    height: 400px;
  }
  ${mediaQuery.minDesktop} {
    height: auto;
    width: 50%;
    min-height: 400px;
  }
`

const SliderWrapper = styled(Box)`
  width: 100%;
  ${mediaQuery.minDesktop} {
    height: auto;
    width: 50%;
  }
`

function ContentImage({ children, ...rest }: any) {
  return (
    <Box {...rest} display="flex" flexWrap="wrap">
      {children}
    </Box>
  )
}

function ContentImageImage({ src, alt, ...rest }: any) {
  return (
    <ImageWrapper {...rest}>
      <NextImage
        src={src}
        alt={alt || ''}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 992px) 100vw, 50vw"
      />
    </ImageWrapper>
  )
}

export { Content, ContentImageImage as Image, SliderWrapper }
export default ContentImage
