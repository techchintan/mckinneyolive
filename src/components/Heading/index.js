import React from 'react'
import styled from 'styled-components'
import Box from '../Box'

const StyledBox = styled(Box)`
  font-weight: 700;
  text-transform: uppercase;

  span {
    color: ${props => props.theme.colors.primary};
  }
`

StyledBox.defaultProps = {
  color: 'grays.0',
}

const Heading = props => <StyledBox {...props}>{props.children}</StyledBox>
export default Heading
