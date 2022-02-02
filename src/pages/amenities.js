import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from '@styled-icons/material/ArrowForward'
import { getImage } from 'gatsby-plugin-image'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
import Button from '../components/Button'
// Compound
import ContentImage, { Content, Image } from '../compound/ContentImage'
import Table, { THead, TBody, Th, Tr, Td } from '../compound/Table'
// Views
import CardSlider from '../views/CardSlider'
// Assets
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

const Amenities = ({ data }) => {
  const { restaurant, hotel } = data
  const {
    links,
    bottomContent,
    content,
    contentFeatured,
    contentOne,
    contentTwo,
    contentThree,
    sliderOne,
    sliderTwo,
  } = data.pagesJson.amenities
  const [activeCapacity, setActiveCapacity] = useState(0)
  const [activeOption, setActiveOption] = useState(0)
  return (
    <Layout>
      <Seo title="Amenities" />
      <Hero image={data.hero.childImageSharp} alt="McKinney and Olive" />
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
      <Box id="outdoor-piazza" overflow="hidden">
        <ContentImage>
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div
                dangerouslySetInnerHTML={{ __html: contentFeatured.title }}
              />
            </Heading>
            <Box
              dangerouslySetInnerHTML={{ __html: contentFeatured.content }}
            />
          </Content>
          <Image
            image={getImage(data.contentFeaturedImage.childImageSharp)}
            alt="McKinney and Olive"
          />
        </ContentImage>
      </Box>
      <Box id="conference-center" overflow="hidden">
        <ContentImage>
          <Image
            image={getImage(data.contentOneImage.childImageSharp)}
            alt="McKinney and Olive"
          />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentOne.title }} />
            </Heading>
            <Box
              dangerouslySetInnerHTML={{ __html: contentOne.content }}
              mb={[4]}
            />
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
            <Box overflow="auto" mt={[3, 4, 3]} mb={[3]}>
              <Table width={1}>
                {contentOne.capacity.length > 1 && (
                  <THead>
                    <Tr>
                      {contentOne.capacity.map(({ name }, index) => {
                        let color =
                          index === activeCapacity ? `primary` : `grays.0`
                        return (
                          <Th
                            onClick={() => setActiveCapacity(index)}
                            bg={color}
                            key={index}
                          >
                            {name}
                          </Th>
                        )
                      })}
                    </Tr>
                  </THead>
                )}
                <TBody>
                  <Tr bg="primary">
                    {contentOne.capacity[activeCapacity].options.map(
                      ({ name }, index) => {
                        let color =
                          index === activeOption ? `primary` : `grays.0`
                        return (
                          <Td
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
                          </Td>
                        )
                      }
                    )}
                  </Tr>
                  <Tr bg="primary">
                    <Td colSpan={4} textAlign="center">
                      {
                        contentOne.capacity[activeCapacity].options[
                          activeOption
                        ].description
                      }
                    </Td>
                  </Tr>
                  <Tr bg="primary">
                    <Td
                      colSpan={2}
                      style={{ fontWeight: 600, fontSize: '18px' }}
                    >
                      OPTION
                    </Td>

                    <Td
                      colSpan={2}
                      style={{ fontWeight: 600, fontSize: '18px' }}
                    >
                      FLOOR PLAN
                    </Td>
                  </Tr>
                  {contentOne.capacity[activeCapacity].options[
                    activeOption
                  ].options.map(({ name, floor_plan }, index) => (
                    <Tr key={index} bg="primary">
                      <Td colSpan={2} style={{ opacity: 0.8 }}>
                        {name}
                      </Td>

                      <Td colSpan={2} style={{ opacity: 0.8 }}>
                        <Box
                          as="a"
                          color="white"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={conferenceCentreImages[floor_plan]}
                        >
                          View
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </Box>
            <Button
              mt={4}
              as="a"
              href={data.conferenceCenterBrochure.file.url}
              target="_blank"
            >
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
          <Image
            image={getImage(data.contentTwoImage.childImageSharp)}
            alt="McKinney and Olive"
          />
        </ContentImage>
      </Box>
      <Box id="fitness-studio" overflow="hidden" mb={[5, 6]}>
        <ContentImage>
          <Image
            image={getImage(data.contentThreeImage.childImageSharp)}
            alt="McKinney and Olive"
          />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentThree.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentThree.content }} />
            <Box>
              <Button
                mt={4}
                as="a"
                href={contentThree.cta.link}
                target="_blank"
              >
                {contentThree.cta.text}
              </Button>
            </Box>
            <Box>
              <Button
                mt={3}
                as="a"
                href={data.fitnessStudioBrochure.file.url}
                target="_blank"
              >
                {contentThree.ctaText2}
              </Button>
            </Box>
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
            href={data.conciergeNewsletter.pdf.file.url}
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
        contentFeatured {
          title
          content
        }
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
          cta {
            text
            link
          }
          ctaText2
        }
        bottomContent {
          content
          ctaText
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
        gatsbyImageData(placeholder: BLURRED)
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
            raw
          }
          image {
            ...Image
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
            raw
          }
          image {
            ...Image
          }
        }
      }
    }
    contentFeaturedImage: file(relativePath: { eq: "outdoor-piazza.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    contentOneImage: file(relativePath: { eq: "conference-centre.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    contentTwoImage: file(relativePath: { eq: "outdoor-terrace.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    contentThreeImage: file(relativePath: { eq: "fitness-studio.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    conferenceCenterBrochure: contentfulAsset(
      title: { eq: "Conference Center Brochure" }
    ) {
      file {
        url
      }
    }
    fitnessStudioBrochure: contentfulAsset(
      title: { eq: "Fitness Studio Brochure" }
    ) {
      file {
        url
      }
    }
    conciergeNewsletter: contentfulPdf(pdfId: { eq: "concierge-newsletter" }) {
      pdf {
        file {
          url
        }
      }
    }
  }
`

export default Amenities
