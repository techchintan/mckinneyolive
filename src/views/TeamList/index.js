import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Box from '../../components/Box'
import TeamCard from '../../components/TeamCard'

function TeamList({ teams, ...rest }) {
  const data = useStaticQuery(graphql`
    {
      noImage: file(relativePath: { eq: "no_image.png" }) {
        childImageSharp {
          fluid(maxWidth: 970) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Box {...rest} display="flex" flexWrap="wrap" px="5px">
      {teams.map(({ node }) => (
        <TeamCard
          width={[1, 1 / 2, 1 / 5]}
          px={['16px', '5px']}
          pb={['30px', '60px']}
          key={node.title}
          name={node.name}
          position={node.position}
          noImage={data.noImage}
          image={node.image}
          email={node.email}
          phone={node.phone}
        />
      ))}
    </Box>
  )
}

export default TeamList
