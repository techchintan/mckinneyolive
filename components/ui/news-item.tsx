'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import Box from './box'

const wrap = css`
  display: flex;
  flex-wrap: wrap;
`

const titleStyle = css`
  cursor: pointer;
  display: flex;
  font-weight: 700;
  width: 80%;
`

const iconStyle = css`
  flex: none;
  margin-right: 1rem;
`

const dateStyle = css`
  font-weight: 700;
  width: 20%;
  padding-right: 1rem;
`

const StyledWrap = styled(Box)`${wrap}`
const StyledTitle = styled(Box)`${titleStyle}`
const StyledDate = styled(Box)`${dateStyle}`
const StyledIcon = styled(Box)`${iconStyle}`

function Title({ children, ...rest }: any) {
  return <StyledTitle {...rest}>{children}</StyledTitle>
}

function Icon({ children, ...rest }: any) {
  return <StyledIcon {...rest}>{children}</StyledIcon>
}

function DateComp({ children, ...rest }: any) {
  return <StyledDate {...rest}>{children}</StyledDate>
}

function NewsItem({ children, ...rest }: any) {
  return <StyledWrap {...rest}>{children}</StyledWrap>
}

export { DateComp as Date, Title, Icon }
export default NewsItem
