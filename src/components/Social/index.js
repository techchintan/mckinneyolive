import React from 'react'
import styled from 'styled-components'

const StyledSocial = styled.div`
  display: flex;
`

const StyledSocialItem = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 32px;
  height: 32px;
`

const Social = (props) => <StyledSocial>{props.children}</StyledSocial>
const SocialItem = (props) => (
  <StyledSocialItem {...props}>{props.children}</StyledSocialItem>
)

export { Social, SocialItem }
