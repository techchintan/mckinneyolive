import { Link } from 'gatsby'
import styled from 'styled-components'
import { color } from 'styled-system'
import { FacebookF, VimeoV, Instagram } from '@styled-icons/fa-brands'

export const StyledLink = styled(Link)`
  ${color};
  text-decoration: none;
`

export const StyledFacebookF = styled(FacebookF)`
  ${color};
  width: 12px;
`

export const StyledVimeoV = styled(VimeoV)`
  ${color};
  width: 18px;
`

export const StyledInstagram = styled(Instagram)`
  ${color};
  width: 18px;
`
