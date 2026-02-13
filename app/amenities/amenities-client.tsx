"use client"

import { useState } from 'react'
import { Container } from 'styled-bootstrap-grid'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { ArrowForward } from '@styled-icons/material/ArrowForward'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'
import ContentImage, { Content, ContentImageImage } from '@/components/compound/content-image'
import Table, { THead, TBody, Th, Tr, Td } from '@/components/compound/table'
import CardSlider from '@/components/views/card-slider'
import { getImageUrl, getFileUrl } from '@/lib/contentful'

interface AmenitiesPageClientProps {
  amenities: any
  hero: any
  contentFeaturedImage: any
  contentOneImage: any
  contentTwoImage: any
  contentThreeImage: any
  conferenceCenterBrochure: any
  fitnessStudioBrochure: any
  restaurants: any[]
  hotels: any[]
  conferenceCentreImages: Record<string, any>
}

export default function AmenitiesPageClient({
  amenities, hero, contentFeaturedImage, contentOneImage, contentTwoImage, contentThreeImage,
  conferenceCenterBrochure, fitnessStudioBrochure, restaurants, hotels, conferenceCentreImages,
}: AmenitiesPageClientProps) {
  const { links, content, contentFeatured, contentOne, contentTwo, contentThree, sliderOne, sliderTwo } = amenities
  const [activeCapacity, setActiveCapacity] = useState(0)
  const [activeOption, setActiveOption] = useState(0)

  const heroUrl = getImageUrl(hero)
  const ccBrochureUrl = getFileUrl(conferenceCenterBrochure)
  const fitBrochureUrl = getFileUrl(fitnessStudioBrochure)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}

      <Box display="flex" flexWrap="wrap" justifyContent="center" backgroundColor="white" py={5}>
        {links.map(({ label, slug }: any) => (
          <Button key={label} px={5} width={[1, 'auto']} my={2} mx={[0, 2, 3]} as="a" href={slug}>
            {label}
          </Button>
        ))}
      </Box>

      <Container>
        <Box textAlign="center" color="grays.0" fontSize={[4, '30px']} lineHeight="1.1944444444" fontWeight={700} pb={[5, 6]}>
          {content}
        </Box>
      </Container>

      <Box id="outdoor-piazza" overflow="hidden">
        <ContentImage>
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentFeatured.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentFeatured.content }} />
          </Content>
          <ContentImageImage src={getImageUrl(contentFeaturedImage)} alt="McKinney and Olive" />
        </ContentImage>
      </Box>

      <Box id="conference-center" overflow="hidden">
        <ContentImage>
          <ContentImageImage src={getImageUrl(contentOneImage)} alt="McKinney and Olive" />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentOne.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentOne.content }} mb={[4]} />
            <Box display={['flex', null, 'none']} alignItems="center" justifyContent="space-between">
              <ArrowBack size="24" />
              <Box color="grays.0" fontWeight={600}>SWIPE</Box>
              <ArrowForward size="24" />
            </Box>
            <Box overflow="auto" mt={[3, 4, 3]} mb={[3]}>
              <Table width={1}>
                {contentOne.capacity.length > 1 && (
                  <THead>
                    <Tr>
                      {contentOne.capacity.map(({ name }: any, index: number) => (
                        <Th onClick={() => { setActiveCapacity(index); setActiveOption(0); }} bg={index === activeCapacity ? 'primary' : 'grays.0'} key={index}>
                          {name}
                        </Th>
                      ))}
                    </Tr>
                  </THead>
                )}
                <TBody>
                  <Tr bg="primary">
                    {contentOne.capacity[activeCapacity].options.map(({ name }: any, index: number) => (
                      <Td style={{ fontWeight: 600, fontSize: '18px', cursor: 'pointer' }} bg={index === activeOption ? 'primary' : 'grays.0'} key={index} onClick={() => setActiveOption(index)}>
                        {name}
                      </Td>
                    ))}
                  </Tr>
                  <Tr bg="primary">
                    <Td colSpan={4} textAlign="center">
                      {contentOne.capacity[activeCapacity].options[activeOption].description}
                    </Td>
                  </Tr>
                  <Tr bg="primary">
                    <Td colSpan={2} style={{ fontWeight: 600, fontSize: '18px' }}>OPTION</Td>
                    <Td colSpan={2} style={{ fontWeight: 600, fontSize: '18px' }}>FLOOR PLAN</Td>
                  </Tr>
                  {contentOne.capacity[activeCapacity].options[activeOption].options.map(({ name, floor_plan }: any, index: number) => {
                    const floorPlanAsset = conferenceCentreImages[floor_plan]
                    const fileUrl = floorPlanAsset ? getFileUrl(floorPlanAsset) : null
                    return (
                      <Tr key={index} bg="primary">
                        <Td colSpan={2} style={{ opacity: 0.8 }}>{name}</Td>
                        <Td colSpan={2} style={{ opacity: 0.8 }}>
                          {fileUrl && <Box as="a" color="white" target="_blank" rel="noopener noreferrer" href={fileUrl}>View</Box>}
                        </Td>
                      </Tr>
                    )
                  })}
                </TBody>
              </Table>
            </Box>
            {ccBrochureUrl && (
              <div>
                <Button mt={4} as="a" href={ccBrochureUrl} target="_blank" rel="noreferrer noopener">
                  {contentOne.ctaText}
                </Button>
              </div>
            )}
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
          <ContentImageImage src={getImageUrl(contentTwoImage)} alt="McKinney and Olive" />
        </ContentImage>
      </Box>

      <Box id="fitness-studio" overflow="hidden" mb={[5, 6]}>
        <ContentImage>
          <ContentImageImage src={getImageUrl(contentThreeImage)} alt="McKinney and Olive" />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentThree.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentThree.content }} />
            <Box>
              <Button mt={4} as="a" href={contentThree.cta.link} target="_blank">{contentThree.cta.text}</Button>
            </Box>
            {fitBrochureUrl && (
              <Box>
                <Button mt={3} as="a" href={fitBrochureUrl} target="_blank" rel="noreferrer noopener">{contentThree.ctaText2}</Button>
              </Box>
            )}
          </Content>
        </ContentImage>
      </Box>

      <Container>
        <Box id="dine-with-us" mb={[5, '100px']}>
          <Heading fontSize={[4, '36px']} pb={[5, '100px']}>
            <div dangerouslySetInnerHTML={{ __html: sliderOne.title }} />
          </Heading>
          <CardSlider data={restaurants.map((r: any) => ({ node: r }))} />
        </Box>
      </Container>

      <Container>
        <Box id="retail" mb={[5, '100px']}>
          <Heading fontSize={[4, '36px']} pb={[5, '100px']}>
            <div dangerouslySetInnerHTML={{ __html: sliderTwo.title }} />
          </Heading>
          <CardSlider data={hotels.map((h: any) => ({ node: h }))} />
        </Box>
      </Container>
    </>
  )
}
