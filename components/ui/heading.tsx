'use client'

import React from 'react'
import styled from 'styled-components'
import Box from './box'

const StyledBox = styled(Box)`
  font-weight: 700;
  text-transform: uppercase;

  span {
    color: ${(props: any) => props.theme.colors.primary};
  }
`

StyledBox.defaultProps = {
  color: 'grays.0',
}

const Heading = (props: any) => <StyledBox {...props}>{props.children}</StyledBox>
export default Heading
