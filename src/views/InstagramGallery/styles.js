import styled from 'styled-components'

import Box from '../../components/Box'
import mediaQuery from '../../utils/mediaQuery'

export const Wrapper = styled(Box)`
  display: grid;
  padding: 8px;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;

  ${mediaQuery.minTablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${mediaQuery.minDesktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  ${mediaQuery.minDesktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`
