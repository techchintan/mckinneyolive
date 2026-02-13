"use client"

import Image from 'next/image'
import { Container } from 'styled-bootstrap-grid'
import ReactPlayer from 'react-player'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'
import ContentImage, { Content, ContentImageImage } from '@/components/compound/content-image'
import TeamList from '@/components/views/team-list'
import { getImageUrl, getFileUrl } from '@/lib/contentful'

interface AboutPageClientProps {
  about: any
  hero: any
  teamHero: any
  contentOneImage: any
  contentTwoImage: any
  theCrescentImage: any
  aboutBrochure: any
  leedCaseStudy: any
  mooBeeImage: any
  management: any[]
}

export default function AboutPageClient({
  about, hero, teamHero, contentOneImage, contentTwoImage,
  theCrescentImage, aboutBrochure, leedCaseStudy, mooBeeImage, management,
}: AboutPageClientProps) {
  const {
    address, contentOne, contentTwo, contentThree,
    links, team, mckinneyOlive, theArchitect,
  } = about

  const heroUrl = getImageUrl(hero)
  const teamHeroUrl = getImageUrl(teamHero)
  const brochureUrl = getFileUrl(aboutBrochure)
  const leedUrl = getFileUrl(leedCaseStudy)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt="McKinney and Olive" />}

      <Container>
        <Box display="flex" flexWrap="wrap" justifyContent="center" backgroundColor="white" py={5}>
          {links.map(({ label, slug }: any) => (
            <Button key={label} px={5} width={[1, 'auto']} my={2} mx={[0, 2, 3]} as="a" href={slug}>
              {label}
            </Button>
          ))}
        </Box>
      </Container>

      <Box overflow="hidden" mb={[4, 0]}>
        <ContentImage>
          <ContentImageImage src={getImageUrl(theCrescentImage)} alt="McKinney and Olive" />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: mckinneyOlive.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: mckinneyOlive.content }} />
            {brochureUrl && (
              <Button mt={4} as="a" target="_blank" rel="noreferrer noopener" href={brochureUrl}>
                {mckinneyOlive.ctaText}
              </Button>
            )}
          </Content>
        </ContentImage>
      </Box>

      <Box overflow="hidden">
        <ContentImage flexDirection="row-reverse" alignItems={['center']}>
          <Box flex="1 0 auto" width={['100%', null, null, '50%']}>
            <Box className="react-player-wrapper">
              <ReactPlayer
                className="react-player-video"
                url={`${theArchitect.videoUrl}?title=0&byline=0&portrait=0`}
                controls
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: theArchitect.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: theArchitect.content }} />
          </Content>
        </ContentImage>
      </Box>

      {teamHeroUrl && (
        <Box mb={6}>
          <Box style={{ position: 'relative', width: '100%', paddingTop: '40%' }}>
            <Image src={teamHeroUrl} alt="McKinney and Olive" fill style={{ objectFit: 'cover' }} />
          </Box>
        </Box>
      )}

      <Container id="management">
        <Box pb={5}>
          <Heading as="h2" mb={0} fontSize={[4, '36px']}>
            <div dangerouslySetInnerHTML={{ __html: team.title }} />
          </Heading>
        </Box>
      </Container>

      <TeamList teams={management.map((t: any) => ({ node: t }))} />

      <Box id="sustainability" overflow="hidden" mb={[4, 0]}>
        <ContentImage flexDirection="row-reverse">
          <ContentImageImage src={getImageUrl(contentOneImage)} alt="McKinney and Olive" />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentOne.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentOne.content }} />
            {leedUrl && (
              <Button mt={4} as="a" href={leedUrl} target="_blank" rel="noreferrer noopener">
                {contentOne.cta.text}
              </Button>
            )}
          </Content>
        </ContentImage>
      </Box>

      <Box id="bees" overflow="hidden" mb={[4, 0]}>
        <ContentImage>
          <ContentImageImage src={getImageUrl(mooBeeImage)} alt={mooBeeImage?.title || 'McKinney and Olive'} />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentTwo.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentTwo.content }} />
            <Button mt={4} as="a" href={contentTwo.cta.url} target="_blank">
              {contentTwo.cta.text}
            </Button>
          </Content>
        </ContentImage>
      </Box>

      <Box id="community" overflow="hidden">
        <ContentImage flexDirection="row-reverse">
          <ContentImageImage src={getImageUrl(contentTwoImage)} alt="McKinney and Olive" />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentThree.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentThree.content }} />
          </Content>
        </ContentImage>
      </Box>

      <Box bg="primary" my={2} px={3} py={[5, 6]} display="flex" justifyContent="center">
        <Box fontSize={[4, '36px']} fontWeight={700} textAlign="center" color="white" dangerouslySetInnerHTML={{ __html: address }} />
      </Box>
    </>
  )
}
