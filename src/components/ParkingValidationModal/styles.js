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

export const close = css`
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  ${mediaQuery.minDesktop} {
    color: ${props => props.theme.colors.white};
  }
`

export const modalWrap = css`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    width: 90%;
    height: 90%;
  }
  ${mediaQuery.minLarge} {
    justify-content: space-between;
  }
`

export const img = css`
  width: 100%;
  order: 2;
  overflow-y: auto;
  ${mediaQuery.minDesktop} {
    order: 1;
    width: 60%;
  }
  ${mediaQuery.minLarge} {
    width: 66%;
  }
`

export const body = css`
  padding: 50px 20px 20px;
  width: 100%;
  order: 1;
  background-color: ${props => props.theme.colors.white};
  ${mediaQuery.minDesktop} {
    order: 2;
    width: 40%;
    padding: 50px 40px;
  }
  ${mediaQuery.minLarge} {
    width: 34%;
  }
`
