import styled, { css } from 'styled-components'
import Img from 'gatsby-image'

import Box from '../../components/Box'
import mediaQuery from '../../utils/mediaQuery'

export const Image = styled(Img)`
  object-fit: cover;
  height: 280px;
`

export const ImageWrap = styled(Box)`
  cursor: pointer;
  padding: 0.3125rem;
`

export const modalContent = css`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`

export const close = css`
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
`

export const image = css`
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

  .gatsby-image-wrapper {
    width: 100%;
  }
`
