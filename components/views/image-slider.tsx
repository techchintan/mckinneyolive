"use client"

import React, { useReducer } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from '@styled-icons/boxicons-regular'
import Box from '@/components/ui/box'
import Modal, { ModalContent } from '@/components/ui/modal'
import mediaQuery from '@/lib/utils/media-query'

const icons = `
  color: ${(props: any) => props.theme?.colors?.grays?.[1] || '#999'};
  cursor: pointer;
  width: 50px;
  position: absolute;
  top: -50px;
  z-index: 100;
  &:hover {
    fill: ${(props: any) => props.theme?.colors?.primary || '#b49a5e'};
  }
  ${mediaQuery.minTablet} {
    width: 24px;
    top: auto;
    bottom: 0;
  }
  ${mediaQuery.minDesktop} {
    top: 40%;
    transform: translateY(-50%);
    width: 48px;
    &.slick-prev {
      left: -48px;
    }
    &.slick-next {
      right: -48px;
    }
  }
`

const StyledLeft = styled(ChevronLeft)`${icons}; left: 0; ${mediaQuery.minTablet} { left: 40%; }`
const StyledNext = styled(ChevronRight)`${icons}; right: 0; ${mediaQuery.minTablet} { right: 40%; }`

const Dots = styled.div`
  ul { display: flex; flex-wrap: wrap; }
`

const Ul = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  justify-content: center;
  button {
    appearance: none;
    background-color: ${(props) => props.theme.colors.grays[1]};
    border: 0;
    border-radius: 100%;
    width: 12px;
    height: 12px;
    margin: 0 6px;
    padding: 0;
    overflow: hidden;
    outline: none;
    text-indent: 100px;
  }
  .slick-active button {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

interface ContentfulImage {
  title?: string
  gatsbyImageData?: any
  url?: string
  file?: { url: string }
}

interface SliderState {
  active: ContentfulImage | null
  open: boolean
}

type SliderAction =
  | { type: 'SET_SLIDE'; active: ContentfulImage }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_MODAL' }

const initialState: SliderState = { active: null, open: false }

function reducer(state: SliderState, action: SliderAction): SliderState {
  switch (action.type) {
    case 'SET_SLIDE':
      return { active: action.active, open: true }
    case 'CLOSE_MODAL':
      return { open: false, active: null }
    case 'OPEN_MODAL':
      return { ...state, open: true }
    default:
      return initialState
  }
}

function getImageUrl(image: ContentfulImage): string {
  if (image.file?.url) return image.file.url.startsWith('//') ? `https:${image.file.url}` : image.file.url
  if (image.url) return image.url.startsWith('//') ? `https:${image.url}` : image.url
  return ''
}

interface ImageSliderProps {
  data: ContentfulImage[]
  [key: string]: any
}

export default function ImageSlider({ data, ...rest }: ImageSliderProps) {
  const [slider, dispatch] = useReducer(reducer, initialState)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <StyledLeft />,
    nextArrow: <StyledNext />,
    appendDots: (dots: React.ReactNode) => (
      <Dots><Ul>{dots}</Ul></Dots>
    ),
  }

  return (
    <>
      {slider.open && slider.active && (
        <Modal id="slider-modal">
          <ModalContent onClick={() => dispatch({ type: 'CLOSE_MODAL' })} background="transparent">
            <Box style={{ width: '100%', position: 'relative', minHeight: '400px' }}>
              <Image
                src={getImageUrl(slider.active)}
                alt={slider.active.title || 'McKinney and Olive'}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </ModalContent>
        </Modal>
      )}
      <Box {...rest} mr="50px" ml="50px" style={{ cursor: 'pointer' }}>
        <Slider {...settings}>
          {data.map((image, index) => (
            <Box key={index} onClick={() => dispatch({ type: 'SET_SLIDE', active: image })}>
              <Box style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <Image
                  src={getImageUrl(image)}
                  alt={image.title || 'McKinney and Olive'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  )
}
