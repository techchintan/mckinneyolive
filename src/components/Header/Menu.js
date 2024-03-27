import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { typography } from 'styled-system'
import mediaQuery from '../../utils/mediaQuery'
import Box from '../Box'

export const Menu = styled.div`
  position: relative;
  overflow-y: auto;
  padding: 16px;
  margin: 0;
  width: 100%;
  transition: all 1.5s;
  opacity: 0;
  z-index: -1;
  ${({ open }) => open && `opacity: 1`};
  height: calc(100vh - 150px);
  ${mediaQuery.maxPhone} {
    padding-top: 0;
    height: calc(100vh - 170px);
  }
`

export const List = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Item = styled.li`
  margin: 16px 0;
  ${mediaQuery.minTablet} {
    margin: 24px 0;
  }
`

const link = css`
  ${typography};
  color: ${(props) => props.theme.colors.white};
  display: block;
  font-weight: 700;
  text-align: center;
`

export const A = styled(Link)`
  ${link}
`

export const ANormal = styled(Box)`
  ${link}
`

export const MobileTabletOnly = styled.div`
  ${mediaQuery.minDesktop} {
    display: none;
  }
`

A.defaultProps = {
  fontSize: 4,
}
