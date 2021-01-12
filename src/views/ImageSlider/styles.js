import { css } from 'styled-components'
import mediaQuery from '../../utils/mediaQuery'

export const icons = css`
  color: ${props => props.theme.colors.grays[1]};
  cursor: pointer;
  width: 50px;
  position: absolute;
  top: -50px;
  z-index: 100;
  &:hover {
    fill: ${props => props.theme.colors.primary};
  }
  ${mediaQuery.minTablet} {
    width: 24px;
    top: auto;
    bottom: 0;
  }
  ${mediaQuery.minDesktop} {
    top: 40%;
    transform: translateY(-50%);
    width: 48px;
    &.slick-prev {
      left: -48px;
    }
    &.slick-next {
      right: -48px;
    }
  }
`

export const dots = css`
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`

export const ul = css`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  justify-content: center;

  button {
    appearance: none;
    background-color: ${props => props.theme.colors.grays[1]};
    border: 0;
    border-radius: 100%;
    width: 12px;
    height: 12px;
    margin: 0 6px;
    padding: 0;
    overflow: hidden;
    outline: none;
    text-indent: 100px;
  }

  .slick-active button {
    background-color: ${props => props.theme.colors.primary};
  }
`

export const icon = css`
  color: ${props => props.theme.colors.secondary};
  display: flex;
  margin-bottom: 10px;
  svg {
    color: ${props => props.theme.colors.primary};
    flex: none;
  }
`
