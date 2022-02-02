import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Box from '../../components/Box'
import Modal, { ModalContent } from './Modal'
import { Image, ImageWrap } from './styles'

const Gallery = ({ images }) => {
  const [active, setActive] = useState(null)

  return (
    <Box display="flex" flexWrap="wrap" p="5px">
      {active && (
        <Modal id="photo-gallery">
          <ModalContent onClick={() => setActive(null)}>
            <GatsbyImage image={getImage(active)} alt={active.title} />
          </ModalContent>
        </Modal>
      )}
      {images.map((item, index) => (
        <ImageWrap
          key={index}
          width={[1, 1 / 3, 1 / 5]}
          onClick={() => setActive(item)}
        >
          <Image image={getImage(item)} alt={item.title} />
        </ImageWrap>
      ))}
    </Box>
  )
}

export default Gallery
