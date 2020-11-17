import React from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { Close } from 'styled-icons/material/Close'

import usePortal from '../../utils/usePortal'
import Box from '../../components/Box'

import { modalContent, close, image } from './styles'

const StyledContent = styled(Box)`
  ${modalContent}
`

const StyledClose = styled(Close)`
  ${close}
`

const StyledImage = styled(Box)`
  ${image}
`

function ModalContent({ children, onClick }) {
  return (
    <StyledContent>
      <StyledClose onClick={onClick} />
      <StyledImage>{children}</StyledImage>
    </StyledContent>
  )
}

function Modal({ id, children }) {
  const target = usePortal(id)
  return createPortal(children, target)
}

export { ModalContent }
export default Modal
