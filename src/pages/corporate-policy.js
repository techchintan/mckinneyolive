import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'
import Heading from '../components/Heading'
import Button from '../components/Button'
import RichTextContentful from '../components/RichTextContentful'

const Policy = ({ data }) => {
  const { legal, privacy } = data
  const { policy } = data.pagesJson
  const [active, setActive] = useState('Legal')
  const pages = [`Legal`, `Privacy`]

  return (
    <Layout>
      <Seo title="Corporate Policy" />
      <Container>
        <Box pt={[5, 6]} pb={5}>
          <Heading as="h2" mb={0} pt={5} fontSize={[5, '36px']}>
            <div dangerouslySetInnerHTML={{ __html: policy.title }} />
          </Heading>
        </Box>
        <Box pb={4}>
          {pages.map(title => (
            <Button
              key={title}
              onClick={() => setActive(title)}
              bg={active === title ? `primary` : ``}
              color={active === title ? `white` : ``}
              mr={3}
            >
              {title}
            </Button>
          ))}
        </Box>
        <Box pb={[5, 6]}>
          {active === `Legal` && (
            <RichTextContentful content={legal.description} />
          )}
          {active === `Privacy` && (
            <RichTextContentful content={privacy.description} />
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    pagesJson {
      policy {
        title
      }
    }
    legal: contentfulPages(title: { eq: "Legal" }) {
      title
      description {
        raw
      }
    }
    privacy: contentfulPages(title: { eq: "Privacy" }) {
      title
      description {
        raw
      }
    }
  }
`

export default Policy
