import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Box from '../components/Box'
import Hero from '../components/Hero'
import RichTextContentful from '../components/RichTextContentful'

export default ({ data }) => {
  const { contentfulNews } = data
  return (
    <Layout>
      <SEO title={`${contentfulNews.title} - News`} />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      <Box id="content-start" py={[5, '100px']}>
        <Container>
          <Box as="h1" mt="0" mb={5}>
            {contentfulNews.title}
          </Box>
          <RichTextContentful content={contentfulNews.content.json} />
        </Container>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      id
      title
      content {
        json
      }
    }
    hero: file(relativePath: { eq: "hero_news.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
