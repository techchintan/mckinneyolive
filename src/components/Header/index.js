import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Box from '../Box'
import Button from '../Button'
import { Social, SocialItem } from '../Social'
import { IconText, Icon, Text } from './IconText'
import { Menu, List, Item, A, ANormal, MobileTabletOnly } from './Menu'
import Modal, {
  ModalContent,
  ModalImage,
  ModalBody,
} from '../ParkingValidationModal'
import {
  StyledFacebookF,
  StyledInstagram,
  StyledParking,
  StyledUserTie,
  Hamburger,
} from './styles'
import logo from '../../images/logo.svg'
import logoWhite from '../../images/logo-white.svg'

const Header = () => {
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
        }
      }
      parkingRate: contentfulMarkdown(slug: { eq: "parking-rates" }) {
        copy {
          childMarkdownRemark {
            html
          }
        }
      }
      sitemap: contentfulAsset(title: { eq: "sitemap" }) {
        gatsbyImageData(placeholder: BLURRED)
      }
      validateOfficeTowerGarageParking: contentfulAsset(
        title: { eq: "Validate Office Tower Garage Parking" }
      ) {
        file {
          url
        }
      }
      valetParkingValidationInstructions: contentfulAsset(
        title: { eq: "Valet Parking Validation Instructions" }
      ) {
        file {
          url
        }
      }
    }
  `)

  const { social, copyright } = data.pagesJson.home
  const { parkingRate } = data
  const { nav } = data.site.siteMetadata
  const [open, set] = useState(false)
  const [openModal, setModal] = useState(false)

  return (
    <>
      {openModal && (
        <Modal id="header-modal">
          <ModalContent onClick={() => setModal(false)}>
            <ModalImage>
              <GatsbyImage
                style={{ height: '100%', width: '100%' }}
                image={getImage(data.sitemap)}
                alt="McKinney and Olive"
              />
            </ModalImage>
            <ModalBody>
              <Box as="h2" mt={0} color="primary">
                PARKING AT MCKINNEY & OLIVE
              </Box>
              <Box as="h3" color="primary" textAlign="left">
                Parking Validation for Tenants of McKinney & Olive
              </Box>
              <div>
                <Box width={['100%', 400, null, '100%']}>
                  <Button
                    width="100%"
                    as="a"
                    href="https://ev.smsvalet.com/Web/WebSite/Login.aspx"
                    target="_blank"
                  >
                    Validate Valet Parking
                  </Button>
                </Box>
                <Box mt={3} width={['100%', 400, null, '100%']}>
                  <Button
                    width="100%"
                    as="a"
                    href={data.valetParkingValidationInstructions.file.url}
                    target="_blank"
                  >
                    Valet Parking Validation Instructions
                  </Button>
                </Box>
                <Box mt={3} width={['100%', 400, null, '100%']}>
                  <Button
                    width="100%"
                    as="a"
                    href={data.validateOfficeTowerGarageParking.file.url}
                    target="_blank"
                  >
                    Validate Office Tower Garage Parking
                  </Button>
                </Box>
              </div>
              <Box mt={4}>
                <Box
                  mt={4}
                  dangerouslySetInnerHTML={{
                    __html: parkingRate?.copy?.childMarkdownRemark.html,
                  }}
                />
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
              </Social>
            </Box>
            <Box display="flex">
              <Box display={['none', null, 'flex']}>
                <Box mr={[null, 0, 4]}>
                  <IconText
                    as="a"
                    href="https://www.ng1.angus.mrisoftware.com/Tenant/default.aspx?CompanyName=Granite&WebsiteName=granite"
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
          <List>
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
                  href="https://www.ng1.angus.mrisoftware.com/Tenant/default.aspx?CompanyName=Granite&WebsiteName=granite"
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
              </Box>
            </MobileTabletOnly>
          </List>
        </Menu>
        <Box pt={[4]} px={2} width={1}>
          <Container>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
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

export default Header
