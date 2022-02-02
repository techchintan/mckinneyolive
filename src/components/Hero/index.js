import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const StyledImage = styled(GatsbyImage)`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`

const Hero = ({ image, alt }) => (
  <StyledImage image={getImage(image)} alt={alt} />
)
export default Hero
