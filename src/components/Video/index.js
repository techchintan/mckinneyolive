import React from 'react'
import Box from '../Box'

const Video = props => (
  <Box
    display="block"
    width={1}
    as="video"
    controls
    style={{
      objectFit: 'cover',
      outline: 'none',
    }}
    {...props}
  >
    {props.children}
  </Box>
)

const Source = props => <Box as="source" {...props} />

export { Video, Source }
