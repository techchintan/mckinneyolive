import styled from 'styled-components'
import Image from 'gatsby-image'

import Box from '../Box'

export const Img = styled(Image)`
  object-fit: cover;
  margin-bottom: 40px;
  width: 100%;
  height: 298px;
`

export const Title = styled(Box)`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
`

export const Icon = styled(Box)`
  align-items: center;
  display: flex;
  margin-bottom: 6px;
`

export const Wrapper = styled(Box)`
  display: flex !important;
  flex-direction: column;
  height: 100%;
  :focus {
    outline: none;
  }
`
