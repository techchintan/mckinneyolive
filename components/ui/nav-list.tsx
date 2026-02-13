'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import Box from './box'

const List = styled(Box)`
  list-style: none;
  margin-top: 0;
  padding: 0;
`

const active = css`
  color: ${(props: any) => props.theme.colors.primary};
`

const normal = css`
  color: ${(props: any) => props.theme.colors.grays[0]};
`

const Item = styled(Box)<{ active?: boolean }>`
  ${(props) => (props.active ? active : normal)};
  cursor: pointer;
  font-weight: 700;
`

function NavList({ list, setActive, active: activeName, ...rest }: any) {
  return (
    <List as="ul" {...rest}>
      {list.map((item: any) => {
        const id = item.id || item.node?.id
        const title = item.title || item.node?.title
        return (
          <Item
            mb={3}
            active={title === activeName}
            onClick={() => setActive(title)}
            as="li"
            key={id}
          >
            {title}
          </Item>
        )
      })}
    </List>
  )
}

export default NavList
