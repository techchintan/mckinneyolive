import React from 'react'
import styled from 'styled-components'

const StyledSocial = styled.div`
  display: flex;
`

const StyledSocialItem = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  width: 44px;
  height: 44px;
`

const Social = (props) => <StyledSocial>{props.children}</StyledSocial>
const SocialItem = (props) => (
  <StyledSocialItem {...props}>{props.children}</StyledSocialItem>
)

export { Social, SocialItem }
