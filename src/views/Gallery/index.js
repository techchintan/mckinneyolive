import React, { useState } from 'react'
import FullImage from 'gatsby-image'

import Box from '../../components/Box'
import Modal, { ModalContent } from './Modal'

import { Image, ImageWrap } from './styles'

export default ({ bigImages, thumbnails }) => {
  const [active, setActive] = useState(null)

  return (
    <Box display="flex" flexWrap="wrap" p="5px">
      {active && active > -1 && (
        <Modal id="photo-gallery">
          <ModalContent onClick={() => setActive(null)}>
            <FullImage fluid={bigImages.images[active].fluid} />
          </ModalContent>
        </Modal>
      )}
      {thumbnails.images.map((item, index) => (
        <ImageWrap
          key={item.id}
          width={[1, 1 / 3, 1 / 5]}
          onClick={() => setActive(index)}
        >
          <Image fluid={item.fluid} alt={item.title} />
        </ImageWrap>
      ))}
    </Box>
  )
}
