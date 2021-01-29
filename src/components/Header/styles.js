import styled from 'styled-components'
import { Link } from 'gatsby'
import { FacebookF, VimeoV, Instagram } from 'styled-icons/fa-brands'
import { Parking } from 'styled-icons/fa-solid/Parking'
import { UserTie } from 'styled-icons/icomoon/UserTie'
import { color } from 'styled-system'

export const StyledFacebookF = styled(FacebookF)`
  ${color};
  width: 12px;
`

export const StyledVimeoV = styled(VimeoV)`
  ${color};
  width: 18px;
`

export const StyledInstagram = styled(Instagram)`
  ${color};
  width: 18px;
`

export const StyledParking = styled(Parking)`
  ${color};
  width: 22px;
`

export const StyledUserTie = styled(UserTie)`
  ${color};
  width: 24px;
`

export const Hamburger = styled.div`
  cursor: pointer;
  width: 22px;
  height: 22px;
  position: relative;

  &::before,
  &::after,
  div {
    background-color: ${({ open, theme }) =>
      open ? theme.colors.white : theme.colors.primary};
    content: '';
    display: block;
    width: 22px;
    height: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
  }

  &::before {
    transform: translateY(-9px);

    ${({ open }) =>
      open &&
      `
      transform: translateY(-50%) rotate(-45deg);
    `}
  }

  &::after {
    transform: translateY(9px);

    ${({ open }) =>
      open &&
      `
      transform: translateY(-50%) rotate(45deg);
    `}
  }

  div {
    ${({ open }) =>
      open &&
      `
      opacity: 0;
    `}
  }
`

export const Privacy = styled(Link)`
  ${color};
`
export const ParkingButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
