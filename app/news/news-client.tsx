"use client"

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Time } from '@styled-icons/boxicons-regular/Time'
import { CalendarAlt } from '@styled-icons/boxicons-regular/CalendarAlt'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import NavList from '@/components/ui/nav-list'
import Modal, { ModalContent, ModalBody, ModalImage } from '@/components/ui/modal'
import RichTextContentful from '@/components/ui/rich-text-contentful'
import NewsList from '@/components/views/news-list'
import AnnouncementList from '@/components/views/announcements-list'
import AwardsList from '@/components/views/awards-list'
import { getImageUrl } from '@/lib/contentful'

interface NewsPageClientProps {
  hero: any
  defaultImage: any
  yearCategories: any[]
  news: any[]
  announcements: any[]
  awards: any[]
}

export default function NewsPageClient({
  hero, defaultImage, yearCategories, news, announcements, awards,
}: NewsPageClientProps) {
  const firstYear = yearCategories[0]?.title || ''
  const [activeYear, setActiveYear] = useState(firstYear)
  const [openNounce, setOpenNounce] = useState<any>(null)

  const activeNews = useMemo(() => {
    return news.filter((n: any) => n.category?.title === activeYear)
  }, [activeYear, news])

  const filteredAnnouncements = useMemo(() => {
    const now = new Date().getTime()
    return announcements.filter((a: any) => {
      const ts = a.announcementDateTimestamp
      return ts && ts >= now
    })
  }, [announcements])

  const heroUrl = getImageUrl(hero)
  const yearList = yearCategories.map((c: any) => ({ node: { id: c.id, title: c.title } }))

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}

      {openNounce && (
        <Modal id="announcement-modal">
          <ModalContent onClick={() => setOpenNounce(null)}>
            {openNounce.image ? (
              <ModalImage>
                <Image src={getImageUrl(openNounce.image)} alt={openNounce.image.title || 'Announcement'} width={800} height={450} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />
              </ModalImage>
            ) : (
              <ModalImage bg="primary">
                {defaultImage && <Image src={getImageUrl(defaultImage)} alt="McKinney and Olive" width={800} height={450} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />}
              </ModalImage>
            )}
            <ModalBody>
              <Box as="h2" mt={0} color="primary">{openNounce.title}</Box>
              <Box mb={4}><RichTextContentful content={openNounce.content} /></Box>
              {openNounce.location && (
                <Box display="flex" color="primary" mb={2}>
                  <Map size="24" /><Box pl={3} color="secondary">{openNounce.location}</Box>
                </Box>
              )}
              {openNounce.time && (
                <Box display="flex" color="primary" mb={2}>
                  <Time size="24" /><Box pl={3} color="secondary">{openNounce.time}</Box>
                </Box>
              )}
              {openNounce.date && (
                <Box display="flex" color="primary" mb={2}>
                  <CalendarAlt size="24" /><Box pl={3} color="secondary">{new Date(openNounce.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Box>
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
                list={yearList}
              />
            </Col>
            <Col col={9} md={10} xl={11}>
              <Box pl={[0, 0, 3]}>
                <Row>
                  <Col xl={7}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>News</span>
                    </Heading>
                    {activeNews.length > 0 ? (
                      <NewsList mb={5} news={activeNews.map((n: any) => ({ node: n }))} />
                    ) : (
                      <Box mb={5}>No news for this year.</Box>
                    )}
                  </Col>
                  <Col xl={5}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>{"What's Happening"}</span>
                    </Heading>
                    {filteredAnnouncements.length > 0 && (
                      <AnnouncementList onClick={setOpenNounce} mb={5} announcements={filteredAnnouncements.map((a: any) => ({ node: a }))} />
                    )}
                  </Col>
                  <Col xl={7}>
                    <Heading lineHeight="1" fontSize={[4, '36px']} mb={4}>
                      <span>Awards</span>
                    </Heading>
                    {awards.length > 0 && <AwardsList awards={awards.map((a: any) => ({ node: a }))} />}
                  </Col>
                </Row>
              </Box>
            </Col>
          </Row>
        </Container>
      </Box>
    </>
  )
}
