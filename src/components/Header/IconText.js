import React from 'react'
import styled from 'styled-components'

const StyledWrap = styled.div`
  cursor: pointer;
  display: inline-block;
  user-select: none;
`

const StyledIcon = styled.div`
  display: inline-block;
  font-size: 1.3rem;
  margin-right: 8px;
  overflow: hidden;

  svg {
    float: left;
    position: relative;
    top: 2px;
  }
`

const StyledText = styled.div`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
`

const IconText = props => (
  <StyledWrap onClick={props.onClick} {...props}>
    {props.children}
  </StyledWrap>
)
const Icon = props => <StyledIcon>{props.children}</StyledIcon>
const Text = props => <StyledText>{props.children}</StyledText>

export { IconText, Icon, Text }
