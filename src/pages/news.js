import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Map } from 'styled-icons/boxicons-solid/Map'
import { Time } from 'styled-icons/boxicons-regular/Time'
import { CalendarAlt } from 'styled-icons/boxicons-regular/CalendarAlt'

// Components
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Box from '../components/Box'
import Heading from '../components/Heading'
import NavList from '../components/NavList'
import RichTextContentful from '../components/RichTextContentful'
import Modal, { ModalContent, ModalBody, ModalImage } from '../components/Modal'

// Views
import NewsList from '../views/NewsList'
import AnnouncementList from '../views/AnnouncementsList'
import AwardsList from '../views/AwardsList'

export default ({ data }) => {
  const {
    allContentfulNews,
    allContentfulYearCategories,
    allContentfulAnnouncements,
    allContentfulAwards,
  } = data

  const announcements = allContentfulAnnouncements.edges
  const awards = allContentfulAwards.edges
  const firstCatYear = allContentfulYearCategories.edges[0].node.title
  const [activeYear, setActiveYear] = useState(firstCatYear)
  const [activeNews, setActiveNews] = useState(null)
  const [openNounce, setOpenNounce] = useState(null)

  const [filteredAnnouncements, setFilteredAnnounce] = useState(null)
  useEffect(() => {
    function getActiveItems(arr) {
      return _.filter(arr, ({ node }) => node.category.title === activeYear)
    }

    const _resNews = getActiveItems(allContentfulNews.edges)
    setActiveNews(_resNews)

    const filteredAnnounce = announcements.filter(item => {
      return item.node.announcementDateTimestamp >= new Date().getTime()
    })
    setFilteredAnnounce(filteredAnnounce)
  }, [activeYear, allContentfulNews.edges, announcements])

  return (
    <Layout>
      <SEO title="News" />
      <Hero fluid={data.hero.childImageSharp.fluid} />
      {openNounce && (
        <Modal id="announcement-modal">
          <ModalContent onClick={() => setOpenNounce(null)}>
            {openNounce.image ? (
              <ModalImage>
                <Img fluid={openNounce.image.fluid} />
              </ModalImage>
            ) : (
              <ModalImage bg="primary">
                <Img fluid={data.defaultImage.childImageSharp.fluid} />
              </ModalImage>
            )}
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                {openNounce.title}
              </Box>
              <Box mb={4}>
                <RichTextContentful content={openNounce.content.json} />
              </Box>
              {!_.isEmpty(openNounce.location) && (
                <Box display="flex" color="primary" mb={2}>
                  <Map size="24" />
                  <Box pl={3} color="secondary">
                    {openNounce.location}
                  </Box>
                </Box>
              )}
              {!_.isEmpty(openNounce.time) && (
                <Box display="flex" color="primary" mb={2}>
                  <Time size="24" />
                  <Box pl={3} color="secondary">
                    {openNounce.time}
                  </Box>
                </Box>
              )}
              {!_.isEmpty(openNounce.date) && (
                <Box display="flex" color="primary" mb={2}>
                  <CalendarAlt size="24" />
                  <Box pl={3} color="secondary">
                    {moment.parseZone(openNounce.date).format('MMM DD YYYY')}
                  </Box>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Box py={[5, '100px']}>
        <Container>
          <Row>
            <Col col={3} md={2} xl={1}>
              <NavList
                height="100%"
                borderRight="1px solid"
                borderRightColor="grays.1"
                active={activeYear}
                setActive={setActiveYear}
                mb={[5, 0]}
                list={allContentfulYearCategories.edges}
              />
            </Col>
            <Col col={9} md={10} xl={11}>
              <Box pl={[0, 0, 3]}>
                <Row>
                  <Col xl={7}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>News</span>
                    </Heading>
                    {!_.isEmpty(activeNews) && (
                      <NewsList mb={5} news={activeNews} />
                    )}
                    {_.isEmpty(activeNews) && (
                      <Box mb={5}>No news for this year.</Box>
                    )}
                  </Col>
                  <Col xl={5}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>Announcements</span>
                    </Heading>
                    {!_.isEmpty(filteredAnnouncements) && (
                      <AnnouncementList
                        onClick={setOpenNounce}
                        mb={5}
                        announcements={filteredAnnouncements}
                      />
                    )}
                  </Col>
                  <Col xl={7}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>Awards</span>
                    </Heading>
                    {!_.isEmpty(awards) && <AwardsList awards={awards} />}
                  </Col>
                </Row>
              </Box>
            </Col>
          </Row>
        </Container>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    hero: file(relativePath: { eq: "hero_news.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    defaultImage: file(relativePath: { eq: "default-image.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulYearCategories(sort: { order: DESC, fields: title }) {
      edges {
        node {
          id
          title
        }
      }
    }
    allContentfulNews(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          date
          slug
          content {
            json
          }
          category {
            title
          }
        }
      }
    }
    allContentfulAnnouncements(sort: { fields: date, order: ASC }) {
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
    allContentfulAwards(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          date
          content {
            json
          }
          title
        }
      }
    }
  }
`
