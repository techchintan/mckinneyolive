import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Hero from '../components/Hero'
import Box from '../components/Box'
import Heading from '../components/Heading'
// Views
import GalleryV from '../views/Gallery'
import { getImage } from 'gatsby-plugin-image'

const Gallery = ({ data }) => {
  return (
    <Layout>
      <Seo title="Gallery" />
      <Hero
        image={getImage(data.hero.childImageSharp)}
        alt="McKinney and Olive"
      />
      <Container>
        <Box py={[5, '100px']}>
          <Heading fontSize={[4, '36px']}>
            <span>Photo</span> Gallery
          </Heading>
        </Box>
      </Container>
      <GalleryV images={data.gallery.images} />
    </Layout>
  )
}

export const query = graphql`
  {
    hero: file(relativePath: { eq: "hero_gallery.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    gallery: contentfulGallery(title: { eq: "Photo Gallery" }) {
      images {
        ...Image
      }
    }
  }
`

export default Gallery
