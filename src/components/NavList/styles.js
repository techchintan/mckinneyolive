import styled, { css } from 'styled-components'

import Box from '../../components/Box'

export const List = styled(Box)`
  list-style: none;
  margin-top: 0;
  padding: 0;
`

const active = css`
  color: ${props => props.theme.colors.primary};
`

const normal = css`
  color: ${props => props.theme.colors.grays[0]};
`

export const Item = styled(Box)`
  ${props => (props.active ? active : normal)};
  cursor: pointer;
  font-weight: 700;
`
