import React, { useReducer } from 'react'
import Img from 'gatsby-image'
import Slider from 'react-slick'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from 'styled-icons/boxicons-regular'

import Box from '../../components/Box'
import Modal, { ModalContent } from '../../components/Modal'

import mediaQuery from '../../utils/mediaQuery'
import { icons, dots, ul } from './styles'

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

const UL = styled.ul`
  ${ul}
`

const ImageWrapper = styled(Box)`
  width: 100%;
`

const Image = styled(Img)`
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <StyledLeft />,
  nextArrow: <StyledNext />,
  appendDots: dots => (
    <Dots>
      <UL>{dots}</UL>
    </Dots>
  ),
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

function ImageSlider({ onClick, data, ...rest }) {
  const [slider, dispatch] = useReducer(reducer, initialState)

  function handleClose() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  function handleOpen(image) {
    dispatch({ type: 'SET_SLIDE', active: image })
  }
  return (
    <>
      {slider.open && (
        <Modal id="slider-modal" context={SliderContext}>
          <ModalContent onClick={handleClose} background="transparent">
            <ImageWrapper>
              <Image
                fluid={slider.active.childImageSharp.fluid}
                imgStyle={{ objectFit: 'contain' }}
              />
            </ImageWrapper>
          </ModalContent>
        </Modal>
      )}
      <SliderContext.Provider value={{ slider, dispatch }}>
        <Box {...rest} mr="50px" ml="50px" style={{ cursor: 'pointer' }}>
          <Slider {...settings}>
            {data.map(image => (
              <Box key={image.id} onClick={() => handleOpen(image)}>
                <Img fluid={image.childImageSharp.fluid} />
              </Box>
            ))}
          </Slider>
        </Box>
      </SliderContext.Provider>
    </>
  )
}

export default ImageSlider
