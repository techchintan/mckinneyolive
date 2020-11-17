import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'

// Components
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Box from '../components/Box'
import Heading from '../components/Heading'

// Views
import GalleryV from '../views/Gallery'

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Gallery" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      <Container>
        <Box py={[5, '100px']}>
          <Heading fontSize={[4, '36px']}>
            <span>Photo</span> Gallery
          </Heading>
        </Box>
      </Container>
      <GalleryV images={data.contentfulGallery.images} />
    </Layout>
  )
}

export const query = graphql`
  {
    hero: file(relativePath: { eq: "hero_gallery.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    contentfulGallery(title: { eq: "Photo Gallery" }) {
      images {
        id
        title
        fluid {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
