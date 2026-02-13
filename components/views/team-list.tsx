"use client"

import Box from '@/components/ui/box'
import TeamCard from '@/components/ui/team-card'

interface TeamNode {
  title?: string
  name: string
  position: string
  image?: any
  email?: string
  phone?: string
}

interface TeamListProps {
  teams: { node: TeamNode }[]
  [key: string]: any
}

export default function TeamList({ teams, ...rest }: TeamListProps) {
  return (
    <Box {...rest} display="flex" flexWrap="wrap" px="5px">
      {teams.map(({ node }) => (
        <TeamCard
          width={[1, 1 / 2, 1 / 5]}
          px={['16px', '5px']}
          pb={['30px', '60px']}
          key={node.name}
          name={node.name}
          position={node.position}
          image={node.image}
          email={node.email}
          phone={node.phone}
        />
      ))}
    </Box>
  )
}
