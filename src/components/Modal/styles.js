import { css } from 'styled-components'
import mediaQuery from '../../utils/mediaQuery'

export const modalContent = css`
  padding: 20px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;

  &::before {
    background-color: ${props => props.theme.colors.black};
    content: '';
    display: block;
    position: fixed;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

export const modalWrap = css`
  background-color: ${props => props.theme.colors.white};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    display: flex;
    width: 90%;
    height: auto;
    max-height: 90%;
  }
`

export const close = css`
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 10;
`

export const img = css`
  width: 100%;
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    width: 50%;
  }
`

export const body = css`
  padding: 20px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  ${mediaQuery.minDesktop} {
    padding: 30px;
    width: 50%;
  }
  ${mediaQuery.minLarge} {
    padding: 50px 40px;
  }
`
