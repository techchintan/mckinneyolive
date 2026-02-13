"use client"

import { Container } from 'styled-bootstrap-grid'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Gallery from '@/components/views/gallery'
import { getImageUrl } from '@/lib/contentful'

interface GalleryPageClientProps {
  hero: any
  images: any[]
}

export default function GalleryPageClient({ hero, images }: GalleryPageClientProps) {
  const heroUrl = getImageUrl(hero)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}
      <Container>
        <Box py={[5, '100px']}>
          <Heading fontSize={[4, '36px']}>
            <span>Photo</span> Gallery
          </Heading>
        </Box>
      </Container>
      <Gallery images={images} />
    </>
  )
}
