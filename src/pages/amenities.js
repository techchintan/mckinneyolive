import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'

// Components
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import Button from '../components/Button'

// Views
import CardSlider from '../views/CardSlider'

export default ({ data }) => {
  const { restaurant, hotel } = data
  const {
    bottomContent,
    content,
    sliderOne,
    sliderTwo,
  } = data.pagesJson.amenities

  return (
    <Layout>
      <SEO title="Amenities" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      <Container>
        <Box
          textAlign="center"
          color="grays.0"
          fontSize={[4, '30px']}
          lineHeight="1.1944444444"
          fontWeight={700}
          py={[5, 6]}
        >
          {content}
        </Box>
        <Heading id="dine" fontSize={[4, '36px']} pb={[5, '100px']}>
          <div dangerouslySetInnerHTML={{ __html: sliderOne.title }} />
        </Heading>
        <CardSlider mb={[5, '100px']} data={restaurant.edges} />
        <Heading id="retail" fontSize={[4, '36px']} pb={[5, '100px']}>
          <div dangerouslySetInnerHTML={{ __html: sliderTwo.title }} />
        </Heading>
        <CardSlider mb={[5, '100px']} data={hotel.edges} />
      </Container>
      <Box
        bg="primary"
        my={2}
        px={3}
        py={[5, 6]}
        display="flex"
        justifyContent="center"
      >
        <Box maxWidth={1024} color="white">
          <Box as="h2" mt={0} fontSize={[4, '36px']}>
            {bottomContent.title}
          </Box>
          <Box as="p">{bottomContent.content}</Box>
          <Button
            color="white"
            width={[1, 'auto']}
            mt={[3, 4]}
            as="a"
            target="_blank"
            href={bottomContent.ctaURL}
          >
            {bottomContent.ctaText}
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    pagesJson {
      amenities {
        content
        bottomContent {
          content
          ctaText
          ctaURL
          title
        }
        sliderOne {
          title
        }
        sliderTwo {
          title
        }
      }
    }
    hero: file(relativePath: { eq: "bg_place.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    restaurant: allContentfulAmenities(
      filter: { category: { elemMatch: { name: { eq: "Restaurant" } } } }
      sort: { order: ASC, fields: order }
    ) {
      edges {
        node {
          title
          address
          id
          phone
          schedule
          url
          website
          content {
            json
          }
          image {
            fluid(maxWidth: 970) {
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
    }
    hotel: allContentfulAmenities(
      filter: { category: { elemMatch: { name: { eq: "Hotel" } } } }
      sort: { order: ASC, fields: order }
    ) {
      edges {
        node {
          title
          address
          id
          phone
          schedule
          url
          website
          content {
            json
          }
          image {
            fluid(maxWidth: 970) {
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
    }
  }
`
