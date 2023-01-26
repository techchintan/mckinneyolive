import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container } from 'styled-bootstrap-grid'
import ReactPlayer from 'react-player'
// Components
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Hero from '../components/Hero'
import Button from '../components/Button'
import Box from '../components/Box'
import Heading from '../components/Heading'
// Compound
import ContentImage, { Content, Image } from '../compound/ContentImage'
// Views
import TeamList from '../views/TeamList'

const About = ({ data }) => {
  const [beesContentBoxDimensions, setBeesContentBoxDimensions] = useState({
    width: 0,
    height: 0,
  })
  const {
    address,
    contentOne,
    contentTwo,
    contentThree,
    // customerService,
    links,
    team,
    mckinneyOlive,
    theArchitect,
  } = data.pagesJson.about

  return (
    <Layout>
      <Seo title="About" />
      <Hero image={data.hero} alt="Mckinney and Olive" />
      <Container>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          backgroundColor="white"
          py={5}
        >
          {links.map(({ label, slug }) => (
            <Button
              key={label}
              px={5}
              width={[1, 'auto']}
              my={2}
              mx={[0, 2, 3]}
              as="a"
              href={slug}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Container>
      <Box overflow="hidden" mb={[4, 0]}>
        <ContentImage>
          <Image
            image={getImage(data.theCrescentImage)}
            alt="McKinney and Olive"
          />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: mckinneyOlive.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: mckinneyOlive.content }} />
            <Button
              mt={4}
              as="a"
              target="_blank"
              rel="noreferrer noopener"
              href={`https:${data.aboutBrochure.file.url}`}
            >
              {mckinneyOlive.ctaText}
            </Button>
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
      {/* <Container>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          backgroundColor="white"
          py={5}
        >
          <Heading as="h2" fontSize={[4, '36px']}>
            <div dangerouslySetInnerHTML={{ __html: customerService.title }} />
          </Heading>
          <Box>{customerService.content}</Box>
        </Box>
      </Container> */}
      <Box mb={6}>
        <GatsbyImage image={getImage(data.teamHero)} alt="McKinney and Olive" />
      </Box>
      <Container id="management">
        <Box pb={5}>
          <Heading as="h2" mb={0} fontSize={[4, '36px']}>
            <div dangerouslySetInnerHTML={{ __html: team.title }} />
          </Heading>
        </Box>
      </Container>
      <TeamList teams={data.management.edges} />
      <Box id="sustainability" overflow="hidden" mb={[4, 0]}>
        <ContentImage flexDirection="row-reverse">
          <Image
            image={getImage(data.contentOneImage)}
            alt="McKinney and Olive"
          />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentOne.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentOne.content }} />
            <Button
              mt={4}
              as="a"
              href={`https:${data.leedCaseStudy.file.url}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {contentOne.cta.text}
            </Button>
          </Content>
        </ContentImage>
      </Box>
      <Box id="bees" overflow="hidden" mb={[4, 0]}>
        <ContentImage>
          <Image
            image={getImage(data.mooBeeImage)}
            alt={data.mooBeeImage?.title}
          />
          {/* <Box
            position="relative"
            width={['100%', null, null, '50%']}
            alignSelf={['center', null, null, 'stretch']}
            paddingTop={['56.25%', null, null, 'unset']}
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={[
                0,
                null,
                null,
                `-${
                  ((beesContentBoxDimensions.height * 16) / 9 -
                    beesContentBoxDimensions.width) /
                  2
                }px`,
              ]}
              width={[
                '100%',
                null,
                null,
                `${(beesContentBoxDimensions.height * 16) / 9}px`,
              ]}
              height={[
                '100%',
                null,
                null,
                `${beesContentBoxDimensions.height}px`,
              ]}
            >
              <ReactPlayer
                url={`${contentTwo.videoUrl}?title=0&byline=0&portrait=0`}
                controls={false}
                width="100%"
                height="100%"
                muted={true}
                playing={true}
                loop={true}
              />
            </Box>
          </Box> */}
          <Content
            ref={(div) =>
              div &&
              ((div.clientHeight &&
                div.clientHeight > beesContentBoxDimensions.height) ||
                (div.clientWidth &&
                  div.clientWidth > beesContentBoxDimensions.width)) &&
              setBeesContentBoxDimensions({
                width: div.clientWidth,
                height: div.clientHeight,
              })
            }
          >
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
          <Image
            image={getImage(data.contentTwoImage)}
            alt="McKinney and Olive"
          />
          <Content>
            <Heading as="h2" fontSize={[4, '36px']}>
              <div dangerouslySetInnerHTML={{ __html: contentThree.title }} />
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: contentThree.content }} />
            <Box pt={4}>
              <form
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_blank"
              >
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input
                  type="hidden"
                  name="hosted_button_id"
                  value="JWHDCX7BWNXLQ"
                />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt=""
                  border="0"
                  src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </Box>
          </Content>
        </ContentImage>
      </Box>
      <Box
        bg="primary"
        my={2}
        px={3}
        py={[5, 6]}
        display="flex"
        justifyContent="center"
      >
        <Box
          fontSize={[4, '36px']}
          fontWeight={700}
          textAlign="center"
          color="white"
          dangerouslySetInnerHTML={{ __html: address }}
        />
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    pagesJson {
      about {
        address
        contentOne {
          content
          title
          cta {
            text
          }
        }
        contentTwo {
          title
          content
          videoUrl
          cta {
            text
            url
          }
        }
        contentThree {
          title
          content
        }
        customerService {
          content
          title
        }
        links {
          label
          slug
        }
        team {
          title
        }
        mckinneyOlive {
          content
          ctaText
          title
        }
        theArchitect {
          content
          title
          videoUrl
        }
      }
    }
    hero: contentfulAsset(title: { eq: "about_hero" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    teamHero: contentfulAsset(title: { eq: "the-team" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentOneImage: contentfulAsset(title: { eq: "think_sustainable" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    contentTwoImage: contentfulAsset(title: { eq: "thank_you" }) {
      gatsbyImageData(placeholder: BLURRED)
    }
    theCrescentImage: contentfulAsset(
      title: { eq: "image_content_placeholder" }
    ) {
      gatsbyImageData(placeholder: BLURRED)
    }
    aboutBrochure: contentfulAsset(title: { eq: "about-brochure" }) {
      file {
        url
      }
    }
    leedCaseStudy: contentfulAsset(title: { eq: "leed-case-study" }) {
      file {
        url
      }
    }
    mooBeeImage: contentfulAsset(title: { eq: "moo-bee-about" }) {
      title
      gatsbyImageData(placeholder: BLURRED)
    }
    management: allContentfulTeams(
      sort: { order: ASC, fields: order }
      filter: { category: { title: { eq: "Management" } } }
    ) {
      edges {
        node {
          title
          name
          position
          phone
          email
          image {
            ...Image
          }
        }
      }
    }
  }
`

export default About
