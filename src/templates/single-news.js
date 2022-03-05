import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'
import Hero from '../components/Hero'
import RichTextContentful from '../components/RichTextContentful'
import { getImage } from 'gatsby-plugin-image'

const SingleNews = ({ data }) => {
  const { contentfulNews } = data
  return (
    <Layout>
      <Seo title={`${contentfulNews.title} - News`} />
      <Hero image={getImage(data.hero)} alt={contentfulNews.title} />
      <Box id="content-start" py={[5, '100px']}>
        <Container>
          <Box as="h1" mt="0" mb={5}>
            {contentfulNews.title}
          </Box>
          <RichTextContentful content={contentfulNews.content} />
        </Container>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      id
      title
      content {
        raw
      }
    }
    hero: contentfulAsset(title: { eq: "hero_news" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
  }
`

export default SingleNews
