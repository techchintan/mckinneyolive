import styled, { css } from 'styled-components'

import { Search } from '@styled-icons/boxicons-regular/Search'
import { Dollar } from '@styled-icons/boxicons-regular/Dollar'
import { Building } from '@styled-icons/fa-regular/Building'
import { Parking } from '@styled-icons/boxicons-solid'
import { Restaurant } from '@styled-icons/boxicons-regular/Restaurant'
import { Coffee } from '@styled-icons/boxicons-solid'

export const Input = styled.input`
  border: 3px solid ${(props) => props.theme.colors.grays[2]};
  font-size: 1.25rem;
  padding: 1.125rem 1.125rem 1.125rem 3.5rem;
  width: 100%;
`

export const SearchResult = styled(Search)`
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  -webkit-box-shadow: 0px 6px 12px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 6px 12px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 6px 12px 0px rgba(50, 50, 50, 0.5);
`

export const SearchIcon = styled(Search)`
  color: ${(props) => props.theme.colors.primary};
  position: absolute;
  top: 50%;
  left: 1.125rem;
  transform: translateY(-50%);
`

const iconStyles = css`
  color: ${(props) => props.theme.colors.primary};
  flex: none;
  width: 1rem;
  margin-right: 1rem;
`

export const SDollar = styled(Dollar)`
  ${iconStyles}
`
export const SBuilding = styled(Building)`
  ${iconStyles}
`
export const SParking = styled(Parking)`
  ${iconStyles}
`
export const SRestaurant = styled(Restaurant)`
  ${iconStyles}
`
export const SCoffee = styled(Coffee)`
  ${iconStyles}
`

export const IconWrap = styled.div`
  align-items: center;
  display: flex;
  margin: 0.5rem 0;
`
