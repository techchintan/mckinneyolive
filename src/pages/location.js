import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { getImage } from 'gatsby-plugin-image'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Hero from '../components/Hero'
import Box from '../components/Box'
// Views
import MapForm from '../views/MapForm'

const Location = ({ data }) => {
  const { contentOne, contentTwo, address } = data.pagesJson.location

  return (
    <Layout>
      <Seo title="Location" />
      <Hero
        image={getImage(data.hero.childImageSharp)}
        alt="McKinney and Olive"
      />
      <Container>
        <Box
          pt={[5, 6]}
          textAlign="center"
          color="grays.0"
          fontSize={[4, '30px']}
          lineHeight="1.1944444444"
          fontWeight={700}
        >
          {contentOne}
        </Box>
        <Box
          pt={[4, 5]}
          pb={[5, 6]}
          textAlign="center"
          color="grays.0"
          fontSize={[4, '30px']}
          lineHeight="1.1944444444"
          fontWeight={700}
        >
          {contentTwo}
        </Box>
      </Container>
      <MapForm />
      <Box
        bg="primary"
        my={2}
        px={3}
        py={[5, 6]}
        display="flex"
        justifyContent="center"
      >
        <Box
          fontSize={[4, '36px']}
          fontWeight={700}
          textAlign="center"
          color="white"
          dangerouslySetInnerHTML={{ __html: address }}
        />
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    hero: file(relativePath: { eq: "hero_locations.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    pagesJson {
      location {
        contentOne
        contentTwo
        address
      }
    }
  }
`

export default Location
