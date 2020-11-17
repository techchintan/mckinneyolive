import React from 'react'
import Img from 'gatsby-image'

import { Wrapper } from './styles'

const InstagramGallery = ({ allInstaNode }) => (
  <Wrapper>
    {allInstaNode.edges.map(({ node }) => (
      <a
        href={`https://www.instagram.com/p/${node.id}/`}
        target="_blank"
        rel="noopener noreferrer"
        key={node.id}
        style={{ display: 'block' }}
      >
        <Img
          style={{ height: '240px' }}
          fluid={node.localFile.childImageSharp.fluid}
        />
      </a>
    ))}
  </Wrapper>
)

export default InstagramGallery
