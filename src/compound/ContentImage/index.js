import React from 'react'

import Box from '../../components/Box'
import { Content, Image, SliderWrapper } from './styles'

function ContentImage({ children, ...rest }) {
  return (
    <Box {...rest} display="flex" flexWrap="wrap">
      {children}
    </Box>
  )
}

export { Content, Image, SliderWrapper }
export default ContentImage
