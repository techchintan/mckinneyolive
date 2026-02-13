'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'
import styled, { css } from 'styled-components'
import { createPortal } from 'react-dom'
import { Close } from '@styled-icons/material/Close'
import Box from '@/components/ui/box'
import usePortal from '@/lib/utils/use-portal'
import mediaQuery from '@/lib/utils/media-query'
import { getImageUrl } from '@/lib/contentful'

const ImageWrap = styled(Box)`
  cursor: pointer;
  padding: 0.3125rem;
`

const modalContent = css`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`

const close = css`
  color: ${(props: any) => props.theme.colors.white};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
`

const image = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${mediaQuery.minTablet} {
    width: 80%;
    height: auto;
    padding: 50px;
  }
`

const StyledContent = styled(Box)`${modalContent}`
const StyledClose = styled(Close)`${close}`
const StyledImage = styled(Box)`${image}`

function GalleryModal({ id, children }: any) {
  const target = usePortal(id)
  return createPortal(children, target)
}

function ModalContent({ children, onClick }: any) {
  return (
    <StyledContent>
      <StyledClose onClick={onClick} />
      <StyledImage>{children}</StyledImage>
    </StyledContent>
  )
}

const Gallery = ({ images }: { images: any[] }) => {
  const [active, setActive] = useState<any>(null)

  return (
    <Box display="flex" flexWrap="wrap" p="5px">
      {active && (
        <GalleryModal id="photo-gallery">
          <ModalContent onClick={() => setActive(null)}>
            <div style={{ width: '100%', position: 'relative', height: '70vh' }}>
              <NextImage
                src={getImageUrl(active)}
                alt={active.fields?.title || 'Gallery image'}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </ModalContent>
        </GalleryModal>
      )}
      {images.map((item, index) => {
        const url = getImageUrl(item)
        if (!url) return null
        return (
          <ImageWrap
            key={index}
            width={[1, '33.333%', '20%']}
            onClick={() => setActive(item)}
          >
            <div style={{ position: 'relative', width: '100%', height: '280px' }}>
              <NextImage
                src={url}
                alt={item.fields?.title || 'Gallery image'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 33vw, 20vw"
              />
            </div>
          </ImageWrap>
        )
      })}
    </Box>
  )
}

export default Gallery
