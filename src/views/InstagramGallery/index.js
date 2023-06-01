import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Wrapper } from './styles'

const InstagramGallery = ({ allInstaNode }) => {
  return (
    <Wrapper>
      {allInstaNode.edges.map(({ node }) => {
        return (
          <a
            href={node.permalink}
            target="_blank"
            rel="noopener noreferrer"
            key={node.id}
            style={{ display: 'block' }}
          >
            <GatsbyImage
              style={{ height: '240px' }}
              image={getImage(node.localFile.childImageSharp)}
              alt={node.caption}
            />
          </a>
        )
      })}
    </Wrapper>
  )
}

export default InstagramGallery
