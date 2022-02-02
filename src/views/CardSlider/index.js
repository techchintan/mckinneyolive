import React, { useReducer, useState, useEffect } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Web } from '@styled-icons/material/Web'
import { Schedule } from '@styled-icons/material/Schedule'
import { MobileAlt } from '@styled-icons/boxicons-regular/MobileAlt'
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft'
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight'
import Box from '../../components/Box'
import MediaCard from '../../components/MediaCard'
import RichTextContentful from '../../components/RichTextContentful'
import Modal, {
  ModalContent,
  ModalBody,
  ModalImage,
} from '../../components/Modal'

import mediaQuery from '../../utils/mediaQuery'
import { icons, dots, ul, icon } from './styles'

const StyledLeft = styled(ChevronLeft)`
  ${icons};
  left: 0;
  ${mediaQuery.minTablet} {
    left: 40%;
  }
`

const StyledNext = styled(ChevronRight)`
  ${icons};
  right: 0;
  ${mediaQuery.minTablet} {
    right: 40%;
  }
`

const Dots = styled.div`
  ${dots}
`

const Ul = styled.ul`
  ${ul}
`

const Icon = styled(Box)`
  ${icon}
`

const Image = styled(GatsbyImage)`
  object-fit: cover;
  height: 100%;
`

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <StyledLeft />,
  nextArrow: <StyledNext />,
  appendDots: dots => (
    <Dots>
      <Ul>{dots}</Ul>
    </Dots>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
      },
    },
  ],
}

const SliderContext = React.createContext(null)

const initialState = {
  active: null,
  open: false,
}

const SET_SLIDE = 'SET_SLIDE'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

function reducer(state, action) {
  switch (action.type) {
    case SET_SLIDE:
      return {
        active: action.active,
        open: true,
      }

    case CLOSE_MODAL:
      return {
        open: false,
        active: {},
      }

    case OPEN_MODAL:
      return {
        open: true,
      }

    default:
      return initialState
  }
}

function CardSlider({ onClick, data, ...rest }) {
  const [maxCardHeight, setMaxCardHeight] = useState(0)
  const [finishMount, setFinishMount] = useState(false)
  const [slider, dispatch] = useReducer(reducer, initialState)

  function handleClose() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  function handleOpen(node) {
    dispatch({ type: 'SET_SLIDE', active: node })
  }

  useEffect(() => {
    setTimeout(() => setFinishMount(true), 10)
  }, [])

  return (
    <>
      {slider.open && (
        <Modal id="slider-modal" context={SliderContext}>
          <ModalContent onClick={handleClose}>
            <ModalImage>
              <Image
                image={getImage(slider.active.image)}
                alt={slider.active.title}
              />
            </ModalImage>
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                {slider.active.title}
              </Box>
              <Box mb={4}>
                <RichTextContentful content={slider.active.content} />
              </Box>
              <Icon
                href={`https://www.google.com/maps/place/${slider.active.address}`}
                as="a"
                target="_blank"
              >
                <Map size="24" /> <Box pl={3}>{slider.active.address}</Box>
              </Icon>
              <Icon href={slider.active.url} as="a" target="_blank">
                <Web size="24" /> <Box pl={3}>{slider.active.website}</Box>
              </Icon>
              <Icon>
                <Schedule size="24" />{' '}
                <Box pl={3}>{slider.active.schedule}</Box>
              </Icon>
              <Icon href={`tel:${slider.active.phone}`} as="a">
                <MobileAlt size="24" /> <Box pl={3}>{slider.active.phone}</Box>
              </Icon>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <SliderContext.Provider value={{ slider, dispatch }}>
        <Box {...rest} mr="-8px" ml="-8px">
          <Slider {...settings}>
            {data.map(({ node }) => (
              <MediaCard
                key={node.id}
                onClick={() => handleOpen(node)}
                px={2}
                node={node}
                cardHeight={finishMount ? maxCardHeight : undefined}
                cardRef={div => {
                  if (div) {
                    if (
                      div.clientHeight &&
                      div.clientHeight > 0 &&
                      div.clientHeight > maxCardHeight
                    ) {
                      setMaxCardHeight(div.clientHeight)
                    }
                  }
                }}
              />
            ))}
          </Slider>
        </Box>
      </SliderContext.Provider>
    </>
  )
}

export default CardSlider
