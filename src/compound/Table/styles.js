import styled from 'styled-components'

import Box from '../../components/Box'

export const Table = styled(Box)``
export const THead = styled(Box)`
  font-weight: 700;
  text-align: left;
`
export const TBody = styled(Box)``
export const TFoot = styled(Box)``
export const TH = styled(Box)`
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  line-height: normal;
  text-transform: uppercase;
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`
export const TR = styled(Box)``
export const TD = styled(Box)`
  color: ${props => props.theme.colors.white};
`

Table.defaultProps = {
  as: 'table',
}

THead.defaultProps = {
  as: 'thead',
}

TBody.defaultProps = {
  as: 'tbody',
}

TFoot.defaultProps = {
  as: 'tfoot',
}

TH.defaultProps = {
  as: 'th',
  py: '24px',
  px: '30px',
  bg: 'primary',
  color: 'white',
  fontSize: 4,
}

TR.defaultProps = {
  as: 'tr',
}

TD.defaultProps = {
  as: 'td',
  px: '30px',
  py: 3,
}
