import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import moment from 'moment'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { Map } from 'styled-icons/boxicons-solid/Map'
import { Time } from 'styled-icons/boxicons-regular/Time'
import { CalendarAlt } from 'styled-icons/boxicons-regular/CalendarAlt'
import ReactPlayer from 'react-player'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Heading from '../components/Heading'

import InstagramGallery from '../views/InstagramGallery'
import HeaderLinks from '../views/HeaderLinks'
import HomeContent from '../views/HomeContent'
import RichTextContentful from '../components/RichTextContentful'
import Modal, { ModalContent, ModalBody, ModalImage } from '../components/Modal'

export default ({ data }) => {
  const { home } = data.pagesJson
  const [activeAnnouncement, setAnnouncement] = useState(null)
  const { allContentfulAnnouncements } = data
  const [announcements, setFilteredAnnounce] = useState(null)
  const { allInstaNode } = data

  useEffect(() => {
    const filteredAnnounce = allContentfulAnnouncements.edges
      .filter(item => {
        // return item.node.announcementDateTimestamp >= new Date().getTime();
        return true
      })
      .sort(
        (a, b) =>
          a.node.announcementDateTimestamp - b.node.announcementDateTimestamp
      )
    setFilteredAnnounce(filteredAnnounce)
  }, [allContentfulAnnouncements.edges])

  return (
    <Layout>
      <SEO title="Home" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      {activeAnnouncement && (
        <Modal id="announcement-modal">
          <ModalContent onClick={() => setAnnouncement(null)}>
            {activeAnnouncement.image ? (
              <ModalImage>
                <Img fluid={activeAnnouncement.image.fluid} />
              </ModalImage>
            ) : (
              <ModalImage bg="primary">
                <Img fluid={data.defaultImage.childImageSharp.fluid} />
              </ModalImage>
            )}
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                {activeAnnouncement.title}
              </Box>
              <Box mb={4}>
                <RichTextContentful content={activeAnnouncement.content.json} />
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
      {announcements && (
        <HomeContent
          onClick={setAnnouncement}
          home={home}
          bg={data.bg.childImageSharp.fluid}
          announcement={announcements}
          title={home.announcement.title}
          announcementContent={home.announcement.content}
        />
      )}
      <Box width="100%">
        <div className="react-player-wrapper">
          <ReactPlayer
            className="react-player-video"
            url="https://player.vimeo.com/video/371457760?title=0&byline=0&portrait=0"
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Box>
      <Container>
        <Heading as="h2" mb={0} pt={5} fontSize={[5, '36px']}>
          <div dangerouslySetInnerHTML={{ __html: home.social.title }} />
        </Heading>
        <Box pb={5}>
          <Box
            as="a"
            color="grays.0"
            href={home.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            #mckinneyandolive on Instagram
          </Box>
        </Box>
      </Container>
      {allInstaNode && <InstagramGallery allInstaNode={allInstaNode} />}
    </Layout>
  )
}

export const query = graphql`
  {
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
    hero: file(relativePath: { eq: "home_hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bg: file(relativePath: { eq: "bg_place.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    defaultImage: file(relativePath: { eq: "default-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulAnnouncements(sort: { order: ASC, fields: date }) {
      edges {
        node {
          id
          title
          content {
            json
          }
          time
          location
          date
          announcementDateTimestamp
          image {
            fluid(maxWidth: 1920) {
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
    allInstaNode(
      sort: { order: DESC, fields: timestamp }
      filter: { username: { eq: "3291151658" } }
      limit: 12
    ) {
      edges {
        node {
          id
          username
          caption
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
