import React from 'react'
import styled from 'styled-components'

import Box from '../Box'
import { title, date, wrap, icon } from './styles'

const StyledWrap = styled(Box)`
  ${wrap}
`
const StyledTitle = styled(Box)`
  ${title}
`
const StyledDate = styled(Box)`
  ${date}
`
const StyledIcon = styled(Box)`
  ${icon}
`

function Title({ children, ...rest }) {
  return <StyledTitle {...rest}>{children}</StyledTitle>
}

function Icon({ children, ...rest }) {
  return <StyledIcon {...rest}>{children}</StyledIcon>
}

function Date({ children, ...rest }) {
  return <StyledDate {...rest}>{children}</StyledDate>
}

function NewsItem({ children, ...rest }) {
  return <StyledWrap {...rest}>{children}</StyledWrap>
}

export { Date, Title, Icon }
export default NewsItem
