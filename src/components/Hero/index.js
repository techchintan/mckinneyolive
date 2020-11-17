import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const StyledImage = styled(Img)`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`

export default ({ fluid }) => <StyledImage fluid={fluid} />
