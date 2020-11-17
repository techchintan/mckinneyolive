import React from 'react'
import styled from 'styled-components'

import Box from '../Box'

const StyledBox = styled(Box)`
  cursor: pointer;
  display: inline-block;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
`

StyledBox.defaultProps = {
  color: 'primary',
  py: 16,
  px: 32,
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: 'grays.1',
}

export default props => <StyledBox {...props}>{props.children}</StyledBox>
