import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import Img from 'gatsby-image'

import Box from '../Box'
import Button from '../Button'
import { Social, SocialItem } from '../Social'
import { IconText, Icon, Text } from './IconText'
import { Menu, Item, A, ANormal, MobileTabletOnly } from './Menu'
import Modal, {
  ModalContent,
  ModalImage,
  ModalBody,
} from '../ParkingValidationModal'

import {
  StyledFacebookF,
  StyledVimeoV,
  StyledInstagram,
  StyledParking,
  StyledUserTie,
  Hamburger,
  Privacy,
} from './styles'

// import LogoPath from './LogoPath'
import logo from '../../images/logo.svg'
import logoWhite from '../../images/logo-white.svg'

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          nav {
            slug
            text
          }
        }
      }
      pagesJson {
        home {
          social {
            facebook
            vimeo
            instagram
          }
          copyright {
            text
          }
          privacy {
            slug
            text
          }
          parking {
            title
            content
          }
        }
      }
      sitemap: file(relativePath: { eq: "sitemap.png" }) {
        childImageSharp {
          fluid(maxWidth: 2050) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { social, copyright, privacy, parking } = data.pagesJson.home
  const { nav } = data.site.siteMetadata
  const [open, set] = useState(false)
  const [openModal, setModal] = useState(false)

  return (
    <>
      {openModal && (
        <Modal id="header-modal">
          <ModalContent onClick={() => setModal(false)}>
            <ModalImage>
              <Img fluid={data.sitemap.childImageSharp.fluid} />
            </ModalImage>
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                {parking.title}
              </Box>
              <Box mt={4}>
                <Box mt={3}>
                  <Button
                    width={[1, '300px']}
                    as="a"
                    href="http://24.173.70.190/WebValidationManager/(S(0lgrnzueea1moxq5le0hfvru))/Login.aspx?ReturnUrl=%2fWebValidationManager%2fDefault.aspx"
                    target="_blank"
                  >
                    Validate Office Parking
                  </Button>
                </Box>
                <Box mt={3}>
                  <Button
                    width={[1, '300px']}
                    as="a"
                    href="https://ev.smsvalet.com/Web/WebSite/Login.aspx"
                    target="_blank"
                  >
                    Validate Valet Parking
                  </Button>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Box
        bg={open ? `primary` : `white`}
        width={1}
        height={open ? `100vh` : [`73.64px`, '98.19px']}
        position="fixed"
        top="0"
        left="0"
        zIndex={999}
        pt={['15px', '20px']}
        style={{ overflow: 'hidden', transition: 'all 0.5s' }}
      >
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link to="/" onClick={() => set(false)}>
              {/* <Box as="svg" width="240px" viewBox="0 0 471 55">
                <LogoPath open={open} />
              </Box> */}
              <Box width={[180, 240]}>
                {open ? (
                  <img src={logoWhite} alt="logo" />
                ) : (
                  <img src={logo} alt="logo" />
                )}
              </Box>
            </Link>
            <Box display={['none', null, 'block']}>
              <Social>
                <SocialItem href={social.facebook} target="_blank">
                  <StyledFacebookF color={open ? `white` : `primary`} />
                </SocialItem>
                <SocialItem href={social.instagram} target="_blank">
                  <StyledInstagram color={open ? `white` : `primary`} />
                </SocialItem>
                <SocialItem href={social.vimeo} target="_blank">
                  <StyledVimeoV color={open ? `white` : `primary`} />
                </SocialItem>
              </Social>
            </Box>
            <Box display="flex">
              <Box display={['none', null, 'flex']}>
                <Box mr={[null, 0, 4]}>
                  <IconText
                    as="a"
                    href="https://www.ng1.angusanywhere.com/Tenant/default.aspx?CompanyName=250278&WebsiteName=Main"
                    target="_blank"
                  >
                    <Icon>
                      <StyledUserTie color={open ? `white` : `primary`} />
                    </Icon>
                    <Text>
                      <Box color={open ? `white` : `grays.0`}>
                        Customer
                        <br />
                        service
                      </Box>
                    </Text>
                  </IconText>
                </Box>
                <Box mr={[null, 0, 5]} onClick={() => setModal(true)}>
                  <IconText>
                    <Icon>
                      <StyledParking color={open ? `white` : `primary`} />
                    </Icon>
                    <Text>
                      <Box color={open ? `white` : `grays.0`}>
                        Parking
                        <br />
                        validation
                      </Box>
                    </Text>
                  </IconText>
                </Box>
              </Box>
              <Hamburger open={open} onClick={() => set(!open)}>
                <div />
              </Hamburger>
            </Box>
          </Box>
        </Container>
        <Menu open={open}>
          {nav.map(({ text, slug }) => (
            <Item key={slug}>
              <A fontSize={[3, '36px']} to={slug} onClick={() => set(false)}>
                {text}
              </A>
            </Item>
          ))}
          <MobileTabletOnly>
            <Item>
              <ANormal
                as="a"
                fontSize={[3, '36px']}
                href="https://www.ng1.angusanywhere.com/Tenant/default.aspx?CompanyName=250278&WebsiteName=Main"
                target="_blank"
              >
                Customer Service
              </ANormal>
            </Item>
            <Item>
              <ANormal fontSize={[3, '36px']} onClick={() => setModal(true)}>
                Parking Validation
              </ANormal>
            </Item>
            <Box display="flex" justifyContent="center">
              <SocialItem href={social.facebook} target="_blank">
                <StyledFacebookF color={open ? `white` : `primary`} />
              </SocialItem>
              <SocialItem href={social.instagram} target="_blank">
                <StyledInstagram color={open ? `white` : `primary`} />
              </SocialItem>
              <SocialItem href={social.vimeo} target="_blank">
                <StyledVimeoV color={open ? `white` : `primary`} />
              </SocialItem>
            </Box>
          </MobileTabletOnly>
        </Menu>
        <Box
          pt={[4]}
          px={2}
          width={1}
          // style={{ position: 'absolute', bottom: 32, zIndex: -1 }}
        >
          <Container>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              <Privacy to={privacy.slug} color="white">
                {privacy.text}
              </Privacy>
              <Box color="white">
                {copyright.text} {new Date().getFullYear()}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}
