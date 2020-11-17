import React from 'react'
import { List, Item } from './styles'

function NavList({ list, setActive, active, ...rest }) {
  return (
    <List as="ul" {...rest}>
      {list.map(({ node }) => {
        const { id, title } = node
        return (
          <Item
            mb={3}
            active={title === active ? true : false}
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
