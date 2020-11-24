import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import uuidv4 from 'uuid/v4'

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

// Views
import CardSlider from '../views/CardSlider'

import conferenceCentrePDF from '../pdf/conference-centre-brochure.pdf'
import fitnessStudioPDF from '../pdf/fitness-studio-brochure.pdf'

import eastEndOpen from '../images/cc-ushape-east-end-open.jpg'
import westEndOpen from '../images/cc-ushape-west-end-open.jpg'
import northEndOpen from '../images/cc-ushape-north-end-open.jpg'
import southEndOpen from '../images/cc-ushape-south-end-open.jpg'
import chairsFacingEast from '../images/cc-theater-chairs-facing-east.jpg'
import chairsFacingSouth from '../images/cc-theater-chairs-facing-south.jpg'
import tablesFacingEast from '../images/cc-classroom-tables-facing-east.jpg'
import tablesFacingSouth from '../images/cc-classroom-tables-facing-south.jpg'
import small from '../images/cc-boardroom-small.jpg'
import large from '../images/cc-boardroom-large.jpg'

const conferenceCentreImages = {
  eastEndOpen,
  westEndOpen,
  northEndOpen,
  southEndOpen,
  chairsFacingEast,
  chairsFacingSouth,
  tablesFacingEast,
  tablesFacingSouth,
  small,
  large,
}

export default ({ data }) => {
  const { restaurant, hotel } = data
  const {
    links,
    bottomContent,
    content,
    contentOne,
    contentTwo,
    contentThree,
    sliderOne,
    sliderTwo,
  } = data.pagesJson.amenities
  const [activeCapacity, setActiveCapacity] = useState(0)
  const [activeOption, setActiveOption] = useState(0)
  console.log(contentOne.capacity[activeCapacity].options[activeOption])
  return (
    <Layout>
      <SEO title="Amenities" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        backgroundColor="white"
        py={5}
      >
        {links.map(({ label, slug }) => (
          <Button
            key={label}
            px={5}
            width={[1, 'auto']}
            my={2}
            mx={[0, 2, 3]}
            as="a"
            href={slug}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Container>
        <Box
          textAlign="center"
          color="grays.0"
          fontSize={[4, '30px']}
          lineHeight="1.1944444444"
          fontWeight={700}
          pb={[5, 6]}
        >
          {content}
        </Box>
      </Container>
      <Box id="conference-center" overflow="hidden">
        <ContentImage>
          <Image fluid={data.contentOneImage.childImageSharp.fluid} />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentOne.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentOne.content }} />
            <Table width={1} mt={4}>
              {contentOne.capacity.length > 1 && (
                <THead>
                  <TR>
                    {contentOne.capacity.map(({ name }, index) => {
                      let color =
                        index === activeCapacity ? `primary` : `grays.0`
                      return (
                        <TH
                          onClick={() => setActiveCapacity(index)}
                          bg={color}
                          key={index}
                        >
                          {name}
                        </TH>
                      )
                    })}
                  </TR>
                </THead>
              )}
              <TBody>
                <TR bg="primary">
                  {contentOne.capacity[activeCapacity].options.map(
                    ({ name }, index) => {
                      let color = index === activeOption ? `primary` : `grays.0`
                      return (
                        <TD
                          style={{
                            fontWeight: 600,
                            fontSize: '18px',
                            cursor: 'pointer',
                          }}
                          bg={color}
                          key={index}
                          onClick={() => setActiveOption(index)}
                        >
                          {name}
                        </TD>
                      )
                    }
                  )}
                </TR>
                <TR bg="primary">
                  <TD colSpan={4} textAlign="center">
                    {
                      contentOne.capacity[activeCapacity].options[activeOption]
                        .description
                    }
                  </TD>
                </TR>
                <TR bg="primary">
                  <TD colSpan={2} style={{ fontWeight: 600, fontSize: '18px' }}>
                    OPTION
                  </TD>

                  <TD colSpan={2} style={{ fontWeight: 600, fontSize: '18px' }}>
                    FLOOR PLAN
                  </TD>
                </TR>
                {contentOne.capacity[activeCapacity].options[
                  activeOption
                ].options.map(({ name, floor_plan }) => (
                  <TR key={uuidv4()} bg="primary">
                    <TD colSpan={2} style={{ opacity: 0.8 }}>
                      {name}
                    </TD>

                    <TD colSpan={2} style={{ opacity: 0.8 }}>
                      <Box
                        as="a"
                        color="white"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={conferenceCentreImages[floor_plan]}
                      >
                        View
                      </Box>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
            <Button mt={4} as="a" href={conferenceCentrePDF} target="_blank">
              {contentOne.ctaText}
            </Button>
          </Content>
        </ContentImage>
      </Box>
      <Box id="outdoor-terrace" overflow="hidden">
        <ContentImage>
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentTwo.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentTwo.content }} />
          </Content>
          <Image fluid={data.contentTwoImage.childImageSharp.fluid} />
        </ContentImage>
      </Box>
      <Box id="fitness-studio" overflow="hidden" mb={[5, 6]}>
        <ContentImage>
          <Image fluid={data.contentThreeImage.childImageSharp.fluid} />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentThree.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentThree.content }} />
            <Button mt={4} as="a" href={fitnessStudioPDF} target="_blank">
              {contentThree.ctaText}
            </Button>
          </Content>
        </ContentImage>
      </Box>
      <Container>
        <Box id="dine-with-us" mb={[5, '100px']}>
          <Heading fontSize={[4, '36px']} pb={[5, '100px']}>
            <div dangerouslySetInnerHTML={{ __html: sliderOne.title }} />
          </Heading>
          <CardSlider data={restaurant.edges} />
        </Box>
      </Container>
      <Container>
        <Box id="retail" mb={[5, '100px']}>
          <Heading fontSize={[4, '36px']} pb={[5, '100px']}>
            <div dangerouslySetInnerHTML={{ __html: sliderTwo.title }} />
          </Heading>
          <CardSlider data={hotel.edges} />
        </Box>
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
        links {
          label
          slug
        }
        content
        contentOne {
          title
          content
          capacity {
            name
            options {
              name
              description
              options {
                name
                floor_plan
              }
            }
          }
          ctaText
        }
        contentTwo {
          title
          content
        }
        contentThree {
          title
          content
          ctaText
        }
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
    hero: file(relativePath: { eq: "amenities_hero.jpg" }) {
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
    contentOneImage: file(relativePath: { eq: "conference-centre.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    contentTwoImage: file(relativePath: { eq: "outdoor-terrace.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    contentThreeImage: file(relativePath: { eq: "fitness-studio.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
