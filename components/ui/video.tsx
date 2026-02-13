'use client'

import React from 'react'
import Box from './box'

const Video = (props: any) => (
  <Box
    display="block"
    width={1}
    as="video"
    controls
    style={{ objectFit: 'cover', outline: 'none' }}
    {...props}
  >
    {props.children}
  </Box>
)

const Source = (props: any) => <Box as="source" {...props} />

export { Video, Source }
