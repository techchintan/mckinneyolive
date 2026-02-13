"use client"

import { useState } from 'react'
import { Container } from 'styled-bootstrap-grid'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from '@styled-icons/material/ArrowForward'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'
import ContentImage, { Content, SliderWrapper } from '@/components/compound/content-image'
import Table, { THead, TBody, Th, Tr, Td } from '@/components/compound/table'
import ImageSlider from '@/components/views/image-slider'
import { getImageUrl, getFileUrl } from '@/lib/contentful'

interface LeasingPageClientProps {
  leasing: any
  hero: any
  leasingBrochure: any
  buildings: any[]
  leasingImages: any[]
}

export default function LeasingPageClient({
  leasing, hero, leasingBrochure, buildings, leasingImages,
}: LeasingPageClientProps) {
  const { title, content, ctaText, addresses } = leasing
  const [active, setActive] = useState(buildings[0] || null)

  const heroUrl = getImageUrl(hero)
  const brochureUrl = getFileUrl(leasingBrochure)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}

      <Box mt={100} mb={50}>
        <ContentImage alignItems="center">
          <SliderWrapper>
            <ImageSlider data={leasingImages.filter(Boolean)} />
          </SliderWrapper>
          <Content>
            <Box maxWidth={680}>
              <Heading fontSize={[4, '36px']} mb={[3, '40px']}>
                <div dangerouslySetInnerHTML={{ __html: title }} />
              </Heading>
              <Box mb={[3, '40px']}>{content}</Box>
              {brochureUrl && (
                <Button as="a" href={brochureUrl} target="_blank">{ctaText}</Button>
              )}
            </Box>
          </Content>
        </ContentImage>
      </Box>

      {buildings.length > 0 && (
        <Container>
          <Box display={['flex', null, 'none']} alignItems="center" justifyContent="space-between">
            <ArrowBack size="24" />
            <Box color="grays.0" fontWeight={600}>SWIPE</Box>
            <ArrowForward size="24" />
          </Box>
          <Box overflowY="auto" mt={[3, 4, 6]} mb={[5, 6]}>
            <Table width={1}>
              {buildings.length > 1 && (
                <THead>
                  <Tr>
                    {buildings.map((building: any) => (
                      <Th
                        onClick={() => setActive(building)}
                        bg={building.id === active?.id ? 'primary' : 'grays.0'}
                        key={building.id}
                      >
                        {building.title}
                      </Th>
                    ))}
                  </Tr>
                </THead>
              )}
              <TBody>
                <Tr bg="primary">
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>FLOOR</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>RSF</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>SUITE</Td>
                  <Td style={{ fontWeight: 600, fontSize: '18px' }}>FLOOR PLAN</Td>
                </Tr>
                {active?.specifications?.map((spec: any, index: number) => (
                  <Tr key={index} bg="primary">
                    <Td style={{ opacity: 0.8 }}>{spec.floor}</Td>
                    <Td style={{ opacity: 0.8 }}>{spec.rsf}</Td>
                    <Td style={{ opacity: 0.8 }}>{spec.suite}</Td>
                    <Td style={{ opacity: 0.8 }}>
                      {spec.floorPlan?.file?.url && (
                        <Box as="a" color="white" target="_blank" rel="noopener noreferrer" href={`https:${spec.floorPlan.file.url}`}>
                          Download
                        </Box>
                      )}
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </Box>
        </Container>
      )}

      <Box bg="primary" mb={2} px={3} py={[5, 6]}>
        <Box fontWeight={700} textAlign="center" color="white" fontSize={5}>LEASING INFO</Box>
        <Box display={[null, null, 'flex']} justifyContent="center">
          {addresses.map((item: any, index: number) => (
            <Box key={index} fontWeight={700} p={[3, 4]} textAlign="center" color="white">
              <Box fontSize={[4, '24px']}>{item.name}</Box>
              <Box fontSize={2}>
                <div>{item.phone}</div>
                <div>{item.email}</div>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
