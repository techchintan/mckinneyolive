import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Close } from '@styled-icons/material/Close'

// Hooks
import usePortal from '../../utils/usePortal'

import Box from '../Box'

import { modalContent, modalWrap, close, img, body } from './styles'

const StyledModalContent = styled(Box)`
  ${modalContent}
`

const StyledModalWrap = styled(Box)`
  ${modalWrap};
  background: ${({ background }) => background};
`

const StyledClose = styled(Close)`
  ${close}
`

const StyledBody = styled(Box)`
  ${body}
`

const StyledModalImage = styled(Box)`
  ${img}
`

function ModalContent({ children, onClick, background = '#ffffff', ...rest }) {
  return (
    <StyledModalContent {...rest}>
      <StyledClose onClick={onClick} />
      <StyledModalWrap background={background}>{children}</StyledModalWrap>
    </StyledModalContent>
  )
}

function ModalImage({ children, ...rest }) {
  return <StyledModalImage {...rest}>{children}</StyledModalImage>
}

function ModalBody({ children, ...rest }) {
  return <StyledBody {...rest}>{children}</StyledBody>
}

function Modal({ id, children }) {
  const target = usePortal(id)
  return createPortal(children, target)
}

export { ModalContent, ModalImage, ModalBody }
export default Modal
