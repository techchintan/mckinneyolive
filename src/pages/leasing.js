import React, { useState } from 'react'
import isNull from 'lodash/isNull'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import uuidv4 from 'uuid/v4'
import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from 'styled-icons/material/ArrowForward'

// Components
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import Button from '../components/Button'

// Compound
import ContentImage, { Content, Image } from '../compound/ContentImage'
import Table, { THead, TBody, TH, TR, TD } from '../compound/Table'

import leasing from '../pdf/brochure.pdf'

export default ({ data }) => {
  const { title, content, address, ctaText } = data.pagesJson.leasing
  const { allContentfulBuildings } = data
  const firstItem = allContentfulBuildings.edges[0]
  const [active, setActive] = useState(firstItem)

  return (
    <Layout>
      <SEO title="Leasing" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      <Box mt="10px">
        <ContentImage>
          <Image fluid={data.contentImage.childImageSharp.fluid} />
          <Content>
            <Box maxWidth={680}>
              <Heading fontSize={[4, '36px']} mb={[3, '40px']}>
                <div dangerouslySetInnerHTML={{ __html: title }} />
              </Heading>
              <Box mb={[3, '40px']}>{content}</Box>
              <Button as="a" href={leasing} target="_blank">
                {ctaText}
              </Button>
            </Box>
          </Content>
        </ContentImage>
      </Box>
      <Container>
        <Box
          display={['flex', null, 'none']}
          alignItems="center"
          justifyContent="space-between"
        >
          <ArrowBack size="24" />
          <Box color="grays.0" fontWeight={600}>
            SWIPE
          </Box>
          <ArrowForward size="24" />
        </Box>
        <Box overflowY="auto" mt={[3, 4, 6]} mb={[5, 6]}>
          <Table width={1}>
            <THead>
              <TR>
                {allContentfulBuildings.edges.map(item => {
                  const { title, id } = item.node
                  let color = id === active.node.id ? `primary` : `grays.0`
                  return (
                    <TH onClick={() => setActive(item)} bg={color} key={id}>
                      {title}
                    </TH>
                  )
                })}
              </TR>
            </THead>
            <TBody>
              <TR bg="primary">
                <TD style={{ fontWeight: 600, fontSize: '18px' }}>FLOOR</TD>
                <TD style={{ fontWeight: 600, fontSize: '18px' }}>RSF</TD>
                <TD style={{ fontWeight: 600, fontSize: '18px' }}>SUITE</TD>
                <TD style={{ fontWeight: 600, fontSize: '18px' }}>
                  FLOOR PLAN
                </TD>
              </TR>
              {active.node.specifications.map(
                ({ floor, rsf, suite, floorPlan }) => {
                  return (
                    <TR key={uuidv4()} bg="primary">
                      <TD style={{ opacity: 0.8 }}>{floor}</TD>
                      <TD style={{ opacity: 0.8 }}>{rsf}</TD>
                      <TD style={{ opacity: 0.8 }}>{suite}</TD>
                      <TD style={{ opacity: 0.8 }}>
                        {isNull(floorPlan) ? null : (
                          <Box
                            as="a"
                            color="white"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={floorPlan.file.url}
                          >
                            Download
                          </Box>
                        )}
                      </TD>
                    </TR>
                  )
                }
              )}
            </TBody>
          </Table>
        </Box>
      </Container>
      <Box
        bg="primary"
        mb={2}
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
    pagesJson {
      leasing {
        content
        title
        address
        ctaText
      }
    }
    contentImage: file(relativePath: { eq: "content_image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1024) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hero: file(relativePath: { eq: "hero_leasing.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulBuildings(sort: { fields: createdAt }) {
      edges {
        node {
          id
          title
          specifications {
            floor
            rsf
            suite
            floorPlan {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`
