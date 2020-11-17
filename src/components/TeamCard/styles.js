import styled, { css } from 'styled-components'
import Img from 'gatsby-image'

import Box from '../Box'

const emailPhone = css`
  align-items: center;
  display: flex;

  svg {
    color: ${props => props.theme.colors.primary};
    flex: none;
    width: 22px;
    margin-right: 12px;
  }
`

export const Image = styled(Img)`
  margin-bottom: 20px;
  height: 370px;
  width: 100%;
  object-fit: cover;
`

export const Position = styled(Box)`
  text-transform: uppercase;
`

export const Email = styled(Box)`
  ${emailPhone};
`

export const Phone = styled(Box)`
  ${emailPhone};
`

Email.defaultProps = {
  as: 'a',
}

Phone.defaultProps = {
  as: 'a',
}
