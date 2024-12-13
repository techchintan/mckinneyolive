import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Time } from '@styled-icons/boxicons-regular/Time'
import { CalendarAlt } from '@styled-icons/boxicons-regular/CalendarAlt'
// import ReactPlayer from 'react-player'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'
// import InstagramGallery from '../views/InstagramGallery'
import HeaderLinks from '../views/HeaderLinks'
import HomeContent from '../views/HomeContent'
import RichTextContentful from '../components/RichTextContentful'
import Modal, { ModalContent, ModalBody, ModalImage } from '../components/Modal'

const Index = ({ data }) => {
  const { home } = data.pagesJson
  const [activeAnnouncement, setAnnouncement] = useState(null)
  const { allContentfulAnnouncements } = data
  const [announcements, setFilteredAnnounce] = useState(null)
  // const { allInstaNode } = data

  useEffect(() => {
    const filteredAnnounce = allContentfulAnnouncements.edges
      .filter((item) => {
        if (item.node.announcementDateTimestamp >= new Date().getTime())
          return true
        return false
      })
      .sort(
        (a, b) =>
          a.node.announcementDateTimestamp - b.node.announcementDateTimestamp
      )
    setFilteredAnnounce(filteredAnnounce)
  }, [allContentfulAnnouncements.edges])

  return (
    <Layout>
      <Seo title="Home" />
      <Hero image={data.hero} alt="McKinney and Olive" />
      {activeAnnouncement && (
        <Modal id="announcement-modal">
          <ModalContent onClick={() => setAnnouncement(null)}>
            {activeAnnouncement.image ? (
              <ModalImage>
                <GatsbyImage
                  image={getImage(activeAnnouncement.image)}
                  alt={activeAnnouncement.image.title}
                />
              </ModalImage>
            ) : (
              <ModalImage bg="primary">
                <GatsbyImage
                  image={getImage(data.defaultImage)}
                  alt="McKinney and Olive"
                />
              </ModalImage>
            )}
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                {activeAnnouncement.title}
              </Box>
              <Box mb={4}>
                <RichTextContentful content={activeAnnouncement.content} />
              </Box>
              {!isEmpty(activeAnnouncement.location) && (
                <Box display="flex" color="primary" mb={2}>
                  <Map size="24" />
                  <Box pl={3} color="secondary">
                    {activeAnnouncement.location}
                  </Box>
                </Box>
              )}
              {!isEmpty(activeAnnouncement.time) && (
                <Box display="flex" color="primary" mb={2}>
                  <Time size="24" />
                  <Box pl={3} color="secondary">
                    {activeAnnouncement.time}
                  </Box>
                </Box>
              )}
              {!isEmpty(activeAnnouncement.date) && (
                <Box display="flex" color="primary" mb={2}>
                  <CalendarAlt size="24" />
                  <Box pl={3} color="secondary">
                    {moment
                      .parseZone(activeAnnouncement.date)
                      .format('MM/DD/YYYY')}
                  </Box>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <HeaderLinks home={home} />
      <div id="whats-happening">
        {announcements && (
          <HomeContent
            onClick={setAnnouncement}
            home={home}
            bg={data.bg}
            announcement={announcements}
            title={home.announcement.title}
            announcementContent={home.announcement.content}
          />
        )}
      </div>
      <Container>
        <Heading as="h2" mb={0} pt={5} fontSize={[5, '36px']}>
          <div dangerouslySetInnerHTML={{ __html: home.social.title }} />
        </Heading>
        <Box pb={5}>
          <Box
            as="a"
            mr={2}
            color="grays.0"
            href={home.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            @mckinneyandolive on Instagram
          </Box>
        </Box>
      </Container>
      {/* {allInstaNode && <InstagramGallery allInstaNode={allInstaNode} />} */}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    pagesJson {
      home {
        announcement {
          title
          content
        }
        concierge {
          content
          ctaText
          title
        }
        content
        copyright {
          text
        }
        heading
        links {
          label
          slug
        }
        privacy {
          slug
          text
        }
        social {
          facebook
          instagram
          title
          vimeo
        }
      }
    }
    hero: contentfulAsset(title: { eq: "home_hero" }) {
      id
      title
      gatsbyImageData(placeholder: BLURRED)
    }
    bg: contentfulAsset(title: { eq: "bg_place" }) {
      id
      title
      gatsbyImageData(placeholder: BLURRED)
    }
    defaultImage: contentfulAsset(title: { eq: "default_image" }) {
      id
      title
      gatsbyImageData(placeholder: BLURRED)
    }
    allContentfulAnnouncements(sort: { date: ASC }) {
      edges {
        node {
          id
          title
          content {
            raw
            # references {
            #   ... on ContentfulAsset {
            #     contentful_id
            #     __typename
            #     file {
            #       url
            #     }
            #   }
            # }
          }
          time
          location
          date
          announcementDateTimestamp
          image {
            ...Image
          }
        }
      }
    }
    # allInstaNode(
    #   sort: { timestamp: DESC }
    #   filter: { username: { in: ["3291151658", "mckinneyandolive"] } }
    #   limit: 12
    # ) {
    #   edges {
    #     node {
    #       id
    #       username
    #       caption
    #       localFile {
    #         childImageSharp {
    #           gatsbyImageData(placeholder: BLURRED)
    #         }
    #       }
    #     }
    #   }
    # }
    # allInstagramContent(sort: { timestamp: DESC }, limit: 12) {
    #   edges {
    #     node {
    #       caption
    #       permalink
    #       localFile {
    #         childImageSharp {
    #           gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
    #         }
    #       }
    #     }
    #   }
    # }
  }
`

export default Index
