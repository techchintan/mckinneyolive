import { css } from 'styled-components'

export const wrap = css`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
`

export const date = css`
  font-weight: 700;
`

export const title = css`
  font-weight: 700;
  position: relative;
  padding-right: 20px;

  &::before,
  &::after {
    background-color: ${props => props.theme.colors.primary};
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }

  &::before {
    width: 1rem;
    height: 2px;
    top: 6.5px;
  }

  &::after {
    display: ${props => (props.active ? 'none' : 'block')};
    width: 2px;
    height: 1rem;
    right: 7px;
  }
`

export const content = css``
