"use client"

import { Container } from 'styled-bootstrap-grid'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import MapForm from '@/components/views/map-form'
import { getImageUrl } from '@/lib/contentful'

interface LocationPageClientProps {
  location: any
  hero: any
}

export default function LocationPageClient({ location, hero }: LocationPageClientProps) {
  const { contentOne, contentTwo, address } = location
  const heroUrl = getImageUrl(hero)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}
      <Container>
        <Box pt={[5, 6]} textAlign="center" color="grays.0" fontSize={[4, '30px']} lineHeight="1.1944444444" fontWeight={700}>
          {contentOne}
        </Box>
        <Box pt={[4, 5]} pb={[5, 6]} textAlign="center" color="grays.0" fontSize={[4, '30px']} lineHeight="1.1944444444" fontWeight={700}>
          {contentTwo}
        </Box>
      </Container>
      <Box mb={[4, null, null, 6]}>
        <MapForm />
      </Box>
      <Box bg="primary" my={2} px={3} py={[5, 6]} display="flex" justifyContent="center">
        <Box fontSize={[4, '36px']} fontWeight={700} textAlign="center" color="white" dangerouslySetInnerHTML={{ __html: address }} />
      </Box>
    </>
  )
}
