'use client'

import React, { useReducer, useState, useEffect } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import styled, { css } from 'styled-components'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Web } from '@styled-icons/material/Web'
import { Schedule } from '@styled-icons/material/Schedule'
import { MobileAlt } from '@styled-icons/boxicons-regular/MobileAlt'
import { ChevronLeft, ChevronRight } from '@styled-icons/boxicons-regular'
import Box from '@/components/ui/box'
import MediaCard from '@/components/ui/media-card'
import RichTextContentful from '@/components/ui/rich-text-contentful'
import Modal, { ModalContent, ModalBody, ModalImage } from '@/components/ui/modal'
import mediaQuery from '@/lib/utils/media-query'
import { getImageUrl } from '@/lib/contentful'

const icons = css`
  color: ${(props: any) => props.theme.colors.grays[1]};
  cursor: pointer;
  width: 50px;
  position: absolute;
  top: -50px;
  z-index: 100;
  &:hover { fill: ${(props: any) => props.theme.colors.primary}; }
  ${mediaQuery.minTablet} { width: 24px; top: auto; bottom: 0; }
  ${mediaQuery.minDesktop} {
    top: 40%; transform: translateY(-50%); width: 48px;
    &.slick-prev { left: -48px; }
    &.slick-next { right: -48px; }
  }
`

const dots = css`ul { display: flex; flex-wrap: wrap; }`

const ul = css`
  align-items: center; display: flex; list-style: none;
  margin: 3rem 0 0; padding: 0; justify-content: center;
  button {
    appearance: none;
    background-color: ${(props: any) => props.theme.colors.grays[1]};
    border: 0; border-radius: 100%; width: 12px; height: 12px;
    margin: 0 6px; padding: 0; overflow: hidden; outline: none; text-indent: 100px;
  }
  .slick-active button { background-color: ${(props: any) => props.theme.colors.primary}; }
`

const icon = css`
  color: ${(props: any) => props.theme.colors.secondary};
  display: flex; margin-bottom: 10px;
  svg { color: ${(props: any) => props.theme.colors.primary}; flex: none; }
`

const StyledLeft = styled(ChevronLeft)`
  ${icons}; left: 0;
  ${mediaQuery.minTablet} { left: 40%; }
`
const StyledNext = styled(ChevronRight)`
  ${icons}; right: 0;
  ${mediaQuery.minTablet} { right: 40%; }
`
const Dots = styled.div`${dots}`
const Ul = styled.ul`${ul}`
const Icon = styled(Box)`${icon}`

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <StyledLeft />,
  nextArrow: <StyledNext />,
  appendDots: (d: any) => <Dots><Ul>{d}</Ul></Dots>,
  responsive: [
    { breakpoint: 1024, settings: { slidesToScroll: 2, slidesToShow: 2, infinite: true } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: false } },
  ],
}

const initialState = { active: null as any, open: false }

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_SLIDE': return { active: action.active, open: true }
    case 'CLOSE_MODAL': return { open: false, active: {} }
    default: return initialState
  }
}

function CardSlider({ data, ...rest }: any) {
  const [maxCardHeight, setMaxCardHeight] = useState(0)
  const [finishMount, setFinishMount] = useState(false)
  const [slider, dispatch] = useReducer(reducer, initialState)

  useEffect(() => { setTimeout(() => setFinishMount(true), 10) }, [])

  function handleClose() { dispatch({ type: 'CLOSE_MODAL' }) }
  function handleOpen(node: any) { dispatch({ type: 'SET_SLIDE', active: node }) }

  return (
    <>
      {slider.open && slider.active && (
        <Modal id="slider-modal">
          <ModalContent onClick={handleClose}>
            <ModalImage>
              {slider.active.image && (
                <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '300px' }}>
                  <Image
                    src={getImageUrl(slider.active.image)}
                    alt={slider.active.title || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </ModalImage>
            <ModalBody>
              <Box as="h2" mt={0} color="primary">{slider.active.title}</Box>
              <Box mb={4}><RichTextContentful content={slider.active.content} /></Box>
              <Icon href={`https://www.google.com/maps/place/${slider.active.address}`} as="a" target="_blank" rel="noopener noreferrer">
                <Map size="24" /> <Box pl={3}>{slider.active.address}</Box>
              </Icon>
              <Icon href={slider.active.url} as="a" target="_blank" rel="noopener noreferrer">
                <Web size="24" /> <Box pl={3}>{slider.active.website}</Box>
              </Icon>
              <Icon><Schedule size="24" /> <Box pl={3}>{slider.active.schedule}</Box></Icon>
              <Icon href={`tel:${slider.active.phone}`} as="a">
                <MobileAlt size="24" /> <Box pl={3}>{slider.active.phone}</Box>
              </Icon>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Box {...rest} mr="-8px" ml="-8px">
        <Slider {...settings}>
          {data.map((item: any) => {
            const node = item.node || item.fields || item
            return (
              <MediaCard
                key={node.id || node.sys?.id || node.title}
                onClick={() => handleOpen(node)}
                px={2}
                node={node}
                cardHeight={finishMount ? maxCardHeight : undefined}
                cardRef={(div: any) => {
                  if (div && div.clientHeight > 0 && div.clientHeight > maxCardHeight) {
                    setMaxCardHeight(div.clientHeight)
                  }
                }}
              />
            )
          })}
        </Slider>
      </Box>
    </>
  )
}

export default CardSlider
