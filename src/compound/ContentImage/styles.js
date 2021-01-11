import styled from 'styled-components'
import Img from 'gatsby-image'

import mediaQuery from '../../utils/mediaQuery'
import Box from '../../components/Box'

export const Content = styled(Box)`
  flex: 1;
  ${mediaQuery.minDesktop} {
    flex: unset;
  }
`

export const Image = styled(Img)`
  object-fit: cover;
  width: 100%;
  height: 320px;
  ${mediaQuery.minTablet} {
    height: 400px;
  }
  ${mediaQuery.minDesktop} {
    height: auto;
    width: 50%;
  }
`

Content.defaultProps = {
  p: [4, 5, 5, 6],
  width: [1, null, 1 / 2],
}
