import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from '@styled-icons/material/ArrowForward'
import { getImage } from 'gatsby-plugin-image'
import { get } from 'lodash'
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

const Amenities = ({ data }) => {
  const {
    restaurant,
    hotel,
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
  } = data
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
  const conferenceCentreImages = {
    eastEndOpen: eastEndOpen,
    westEndOpen: westEndOpen,
    northEndOpen: northEndOpen,
    southEndOpen: southEndOpen,
    chairsFacingEast: chairsFacingEast,
    chairsFacingSouth: chairsFacingSouth,
    tablesFacingEast: tablesFacingEast,
    tablesFacingSouth: tablesFacingSouth,
    small: small,
    large: large,
  }
  return (
    <Layout>
      <Seo title="Amenities" />
      <Hero image={data.hero} alt="McKinney and Olive" />
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
            image={getImage(data.contentFeaturedImage)}
            alt="McKinney and Olive"
          />
        </ContentImage>
      </Box>
      <Box id="conference-center" overflow="hidden">
        <ContentImage>
          <Image
            image={getImage(data.contentOneImage)}
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
                  ].options.map(({ name, floor_plan }, index) => {
                    let fileUrl = `https://${get(
                      conferenceCentreImages[floor_plan],
                      'file.url'
                    )}`
                    return (
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
                            href={fileUrl}
                          >
                            View
                          </Box>
                        </Td>
                      </Tr>
                    )
                  })}
                </TBody>
              </Table>
            </Box>
            <div>
              <Button
                mt={4}
                as="a"
                href={data.conferenceCenterBrochure.file.url}
                target="_blank"
              >
                {contentOne.ctaText}
              </Button>
            </div>
            <div>
              <Button
                mt={4}
                as="a"
                href={data.conferenceCenterBrochureSocialDistancing.file.url}
                target="_blank"
              >
                {contentOne.ctaTextSocialDistancing}
              </Button>
            </div>
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
            image={getImage(data.contentTwoImage)}
            alt="McKinney and Olive"
          />
        </ContentImage>
      </Box>
      <Box id="fitness-studio" overflow="hidden" mb={[5, 6]}>
        <ContentImage>
          <Image
            image={getImage(data.contentThreeImage)}
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
                href={`https://${data.fitnessStudioBrochure.file.url}`}
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
            href={`https://${data.conciergeNewsletter.pdf.file.url}`}
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
          ctaTextSocialDistancing
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
    hero: contentfulAsset(title: { eq: "amenities_hero" }) {
      gatsbyImageData(placeholder: BLURRED)
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
    contentFeaturedImage: contentfulAsset(title: { eq: "outdoor_piazza" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentOneImage: contentfulAsset(title: { eq: "conference_centre" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentTwoImage: contentfulAsset(title: { eq: "outdoor_terrace" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentThreeImage: contentfulAsset(title: { eq: "fitness_studio" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    conferenceCenterBrochure: contentfulAsset(
      title: { eq: "Conference Center Brochure" }
    ) {
      file {
        url
      }
    }
    conferenceCenterBrochureSocialDistancing: contentfulAsset(
      title: { eq: "McKinney & Olive Conf Center Social Distancing" }
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
    eastEndOpen: contentfulAsset(title: { eq: "cc-ushape-east-end-open" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    westEndOpen: contentfulAsset(title: { eq: "cc-ushape-west-end-open" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    northEndOpen: contentfulAsset(title: { eq: "cc-ushape-north-end-open" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    southEndOpen: contentfulAsset(title: { eq: "cc-ushape-south-end-open" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    chairsFacingEast: contentfulAsset(
      title: { eq: "cc-theater-chairs-facing-east" }
    ) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    chairsFacingSouth: contentfulAsset(
      title: { eq: "cc-theater-chairs-facing-south" }
    ) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    tablesFacingEast: contentfulAsset(
      title: { eq: "cc-classroom-tables-facing-east" }
    ) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    tablesFacingSouth: contentfulAsset(
      title: { eq: "cc-classroom-tables-facing-south" }
    ) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    small: contentfulAsset(title: { eq: "cc-boardroom-small" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
    large: contentfulAsset(title: { eq: "cc-boardroom-large" }) {
      gatsbyImageData(placeholder: BLURRED)
      file {
        url
      }
    }
  }
`

export default Amenities
