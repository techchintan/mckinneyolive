"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Container } from 'styled-bootstrap-grid'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Time } from '@styled-icons/boxicons-regular/Time'
import { CalendarAlt } from '@styled-icons/boxicons-regular/CalendarAlt'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Modal, { ModalContent, ModalBody, ModalImage } from '@/components/ui/modal'
import RichTextContentful from '@/components/ui/rich-text-contentful'
import HeaderLinks from '@/components/views/header-links'
import HomeContent from '@/components/views/home-content'
import InstagramGallery from '@/components/views/instagram-gallery'
import { getImageUrl } from '@/lib/contentful'

interface HomePageClientProps {
  home: any
  hero: any
  bg: any
  defaultImage: any
  announcements: any[]
  instagramPosts: any[]
}

export default function HomePageClient({ home, hero, bg, defaultImage, announcements, instagramPosts }: HomePageClientProps) {
  const [activeAnnouncement, setAnnouncement] = useState<any>(null)
  const [filteredAnnouncements, setFilteredAnnounce] = useState<any[] | null>(null)

  useEffect(() => {
    const now = new Date().getTime()
    const filtered = announcements
      .filter((a: any) => {
        const ts = a.fields?.announcementDateTimestamp || a.announcementDateTimestamp
        return ts && ts >= now
      })
      .sort((a: any, b: any) => {
        const aTs = a.fields?.announcementDateTimestamp || a.announcementDateTimestamp || 0
        const bTs = b.fields?.announcementDateTimestamp || b.announcementDateTimestamp || 0
        return aTs - bTs
      })
    setFilteredAnnounce(filtered)
  }, [announcements])

  const heroUrl = getImageUrl(hero)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}

      {activeAnnouncement && (
        <Modal id="announcement-modal">
          <ModalContent onClick={() => setAnnouncement(null)}>
            {activeAnnouncement.image ? (
              <ModalImage>
                <Image
                  src={getImageUrl(activeAnnouncement.image)}
                  alt={activeAnnouncement.image.title || 'Announcement'}
                  width={800}
                  height={450}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </ModalImage>
            ) : (
              <ModalImage bg="primary">
                {defaultImage && (
                  <Image
                    src={getImageUrl(defaultImage)}
                    alt="McKinney and Olive"
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                  />
                )}
              </ModalImage>
            )}
            <ModalBody>
              <Box as="h2" mt={0} color="primary">{activeAnnouncement.title}</Box>
              <Box mb={4}>
                <RichTextContentful content={activeAnnouncement.content} />
              </Box>
              {activeAnnouncement.location && (
                <Box display="flex" color="primary" mb={2}>
                  <Map size="24" />
                  <Box pl={3} color="secondary">{activeAnnouncement.location}</Box>
                </Box>
              )}
              {activeAnnouncement.time && (
                <Box display="flex" color="primary" mb={2}>
                  <Time size="24" />
                  <Box pl={3} color="secondary">{activeAnnouncement.time}</Box>
                </Box>
              )}
              {activeAnnouncement.date && (
                <Box display="flex" color="primary" mb={2}>
                  <CalendarAlt size="24" />
                  <Box pl={3} color="secondary">
                    {new Date(activeAnnouncement.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </Box>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <HeaderLinks home={home} />

      <div id="whats-happening">
        {filteredAnnouncements && (
          <HomeContent
            onClick={setAnnouncement}
            home={home}
            bg={bg}
            announcement={filteredAnnouncements.map((a: any) => ({ node: a }))}
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

      {instagramPosts.length > 0 && <InstagramGallery posts={instagramPosts} />}
    </>
  )
}
