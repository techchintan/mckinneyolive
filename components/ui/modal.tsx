'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { Close } from '@styled-icons/material/Close'
import usePortal from '@/lib/utils/use-portal'
import Box from './box'
import mediaQuery from '@/lib/utils/media-query'

const modalContent = css`
  padding: 20px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;

  &::before {
    background-color: ${(props: any) => props.theme.colors.black};
    content: '';
    display: block;
    position: fixed;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const modalWrap = css<any>`
  background-color: ${(props: any) => props.theme.colors.white};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    display: flex;
    width: 90%;
    height: auto;
    max-height: 90%;
  }
  background: ${({ background }: any) => background};
`

const close = css`
  color: ${(props: any) => props.theme.colors.white};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 10;
`

const img = css`
  background-color: #005586;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mediaQuery.minDesktop} {
    width: 50%;
  }
`

const body = css`
  padding: 20px;
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.white};
  ${mediaQuery.minDesktop} {
    padding: 30px;
    width: 50%;
  }
  ${mediaQuery.minDesktop} {
    padding: 50px 40px;
  }
`

const StyledModalContent = styled(Box)`
  ${modalContent}
`
const StyledModalWrap = styled(Box)<any>`
  ${modalWrap}
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

export function ModalContent({ children, onClick, background = '#ffffff', ...rest }: any) {
  return (
    <StyledModalContent {...rest}>
      <StyledClose onClick={onClick} />
      <StyledModalWrap background={background}>{children}</StyledModalWrap>
    </StyledModalContent>
  )
}

export function ModalImage({ children, ...rest }: any) {
  return <StyledModalImage {...rest}>{children}</StyledModalImage>
}

export function ModalBody({ children, ...rest }: any) {
  return <StyledBody {...rest}>{children}</StyledBody>
}

function Modal({ id, children }: { id: string; children: React.ReactNode }) {
  const target = usePortal(id)
  return createPortal(children, target)
}

export default Modal
