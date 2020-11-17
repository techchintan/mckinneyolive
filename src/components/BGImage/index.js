import React from 'react'
import styled from 'styled-components'
import Box from '../Box'

const Image = styled.img`
  width: 100%;
  height: 370px;
  object-fit: cover;
`

export default ({ link, ...props }) => (
  <Box
    as="a"
    href={link}
    target="_blank"
    bg="primary"
    width={[1, 1 / 2, 1 / 5]}
    border="6px solid"
    borderColor="white"
  >
    <Image {...props} />
  </Box>
)
