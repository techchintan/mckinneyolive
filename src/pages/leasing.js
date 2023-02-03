import React, { useState } from 'react'
import { isEmpty, isNull } from 'lodash'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from '@styled-icons/material/ArrowForward'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ImageSlider from '../views/ImageSlider'
// Compound
import ContentImage, { Content, SliderWrapper } from '../compound/ContentImage'
import Table, { THead, TBody, Th, Tr, Td } from '../compound/Table'
import { getImage } from 'gatsby-plugin-image'

const Leasing = ({ data }) => {
  const { title, content, ctaText, addresses } = data.pagesJson.leasing
  const { allContentfulBuildings } = data
  const firstItem = allContentfulBuildings.edges[0]
  const [active, setActive] = useState(firstItem)

  return (
    <Layout>
      <Seo title="Leasing" />
      <Hero image={getImage(data.hero)} alt="McKinney and Olive" />
      <Box mt={[100, null, null, 0]} mb={[50, null, 0]}>
        <ContentImage alignItems="center">
          <SliderWrapper>
            <ImageSlider
              data={[
                data.leasing1,
                data.leasing2,
                data.leasing3,
                data.leasing4,
                data.leasing5,
                data.leasing6,
              ]}
            />
          </SliderWrapper>
          <Content>
            <Box maxWidth={680}>
              <Heading fontSize={[4, '36px']} mb={[3, '40px']}>
                <div dangerouslySetInnerHTML={{ __html: title }} />
              </Heading>
              <Box mb={[3, '40px']}>{content}</Box>
              <Button
                as="a"
                href={data.leasingBrochure.file.url}
                target="_blank"
              >
                {ctaText}
              </Button>
            </Box>
          </Content>
        </ContentImage>
      </Box>
      {!isEmpty(allContentfulBuildings.edges) && (
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
              {allContentfulBuildings.edges.length > 1 && (
                <THead>
                  <Tr>
                    {allContentfulBuildings.edges.map((item) => {
                      const { title, id } = item.node
                      let color = id === active.node.id ? `primary` : `grays.0`
                      return (
                        <Th onClick={() => setActive(item)} bg={color} key={id}>
                          {title}
                        </Th>
                      )
                    })}
                  </Tr>
                </THead>
              )}
              <TBody>
                <Tr bg="primary">
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>FLOOR</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>RSF</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>SUITE</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>
                    FLOOR PLAN
                  </Td>
                </Tr>
                {active &&
                  active.node?.specifications?.map(
                    ({ floor, rsf, suite, floorPlan }, index) => {
                      return (
                        <Tr key={index} bg="primary">
                          <Td style={{ opacity: 0.8 }}>{floor}</Td>
                          <Td style={{ opacity: 0.8 }}>{rsf}</Td>
                          <Td style={{ opacity: 0.8 }}>{suite}</Td>
                          <Td style={{ opacity: 0.8 }}>
                            {isNull(floorPlan) ? null : (
                              <Box
                                as="a"
                                color="white"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://${floorPlan.file.url}`}
                              >
                                Download
                              </Box>
                            )}
                          </Td>
                        </Tr>
                      )
                    }
                  )}
              </TBody>
            </Table>
          </Box>
        </Container>
      )}
      <Box bg="primary" mb={2} px={3} py={[5, 6]}>
        <Box fontWeight={700} textAlign="center" color="white" fontSize={5}>
          LEASING INFO
        </Box>
        <Box display={[null, null, 'flex']} justifyContent="center">
          {addresses.map((item, index) => (
            <Box
              key={index}
              fontWeight={700}
              p={[3, 4]}
              textAlign="center"
              color="white"
            >
              <Box fontSize={[4, '24px']}>{item.name}</Box>
              <Box fontSize={2}>
                <div>{item.phone}</div>
                <div>{item.email}</div>
              </Box>
            </Box>
          ))}
        </Box>
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
        addresses {
          name
          phone
          email
        }
      }
    }
    hero: contentfulAsset(title: { eq: "hero-leasing" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentImage: contentfulAsset(title: { eq: "content_image" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing1: contentfulAsset(title: { eq: "leasing_1" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing2: contentfulAsset(title: { eq: "leasing_2" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing3: contentfulAsset(title: { eq: "leasing_3" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing4: contentfulAsset(title: { eq: "leasing_4" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing5: contentfulAsset(title: { eq: "leasing_5" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    leasing6: contentfulAsset(title: { eq: "leasing_6" }) {
      id
      gatsbyImageData(placeholder: BLURRED)
    }
    allContentfulBuildings {
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
    leasingBrochure: contentfulAsset(title: { eq: "Leasing Brochure" }) {
      file {
        url
      }
    }
  }
`

export default Leasing
