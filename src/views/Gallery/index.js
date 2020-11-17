import React, { useState } from 'react'
import FullImage from 'gatsby-image'

import Box from '../../components/Box'
import Modal, { ModalContent } from './Modal'

import { Image, ImageWrap } from './styles'

export default ({ images }) => {
  const [active, setActive] = useState(null)

  return (
    <Box display="flex" flexWrap="wrap" p="5px">
      {active && (
        <Modal id="photo-gallery">
          <ModalContent onClick={() => setActive(null)}>
            <FullImage fluid={active.fluid} />
          </ModalContent>
        </Modal>
      )}
      {images.map(item => (
        <ImageWrap
          key={item.id}
          width={[1, 1 / 3, 1 / 5]}
          onClick={() => setActive(item)}
        >
          <Image fluid={item.fluid} alt={item.title} />
        </ImageWrap>
      ))}
    </Box>
  )
}
