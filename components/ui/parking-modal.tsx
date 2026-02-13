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

const close = css`
  color: ${(props: any) => props.theme.colors.black};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  ${mediaQuery.minDesktop} {
    color: ${(props: any) => props.theme.colors.white};
  }
`

const modalWrap = css`
  background-color: ${(props: any) => props.theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    width: 90%;
    height: 90%;
    justify-content: space-between;
  }
`

const img = css`
  width: 100%;
  order: 2;
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    order: 1;
    width: 66%;
  }
`

const body = css`
  padding: 50px 20px 20px;
  width: 100%;
  order: 1;
  background-color: ${(props: any) => props.theme.colors.white};
  ${mediaQuery.minDesktop} {
    order: 2;
    width: 34%;
    padding: 50px 40px;
  }
`

const StyledModalContent = styled(Box)`${modalContent}`
const StyledModalWrap = styled(Box)`${modalWrap}`
const StyledClose = styled(Close)`${close}`
const StyledBody = styled(Box)`${body}`
const StyledModalImage = styled(Box)`${img}`

export function ModalContent({ children, onClick, ...rest }: any) {
  return (
    <StyledModalContent {...rest}>
      <StyledClose onClick={onClick} />
      <StyledModalWrap>{children}</StyledModalWrap>
    </StyledModalContent>
  )
}

export function ModalImage({ children, ...rest }: any) {
  return <StyledModalImage {...rest}>{children}</StyledModalImage>
}

export function ModalBody({ children, ...rest }: any) {
  return <StyledBody {...rest}>{children}</StyledBody>
}

function ParkingModal({ id, children }: { id: string; children: React.ReactNode }) {
  const target = usePortal(id)
  return createPortal(children, target)
}

export default ParkingModal
