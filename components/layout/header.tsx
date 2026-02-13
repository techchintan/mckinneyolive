'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { Container } from 'styled-bootstrap-grid'
import { FacebookF, Instagram } from '@styled-icons/fa-brands'
import { Parking } from '@styled-icons/boxicons-solid'
import { User as UserTie } from '@styled-icons/boxicons-solid/User'
import { typography, color } from 'styled-system'
import Box from '@/components/ui/box'
import Button from '@/components/ui/button'
import { Social, SocialItem } from '@/components/ui/social'
import ParkingModal, {
  ModalContent as ParkingModalContent,
  ModalImage as ParkingModalImage,
  ModalBody as ParkingModalBody,
} from '@/components/ui/parking-modal'
import mediaQuery from '@/lib/utils/media-query'

// --- Styled Icons ---
const StyledFacebookF = styled(FacebookF)<any>`
  ${color};
  width: 12px;
`
const StyledInstagram = styled(Instagram)<any>`
  ${color};
  width: 18px;
`
const StyledParking = styled(Parking)<any>`
  ${color};
  width: 22px;
`
const StyledUserTie = styled(UserTie)<any>`
  ${color};
  width: 24px;
`

// --- Hamburger ---
const Hamburger = styled.div<{ open: boolean }>`
  cursor: pointer;
  width: 22px;
  height: 22px;
  position: relative;

  &::before,
  &::after,
  div {
    background-color: ${({ open, theme }) =>
      open ? theme.colors.white : theme.colors.primary};
    content: '';
    display: block;
    width: 22px;
    height: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
  }

  &::before {
    transform: translateY(-9px);
    ${({ open }) =>
      open && `transform: translateY(-50%) rotate(-45deg);`}
  }

  &::after {
    transform: translateY(9px);
    ${({ open }) =>
      open && `transform: translateY(-50%) rotate(45deg);`}
  }

  div {
    ${({ open }) => open && `opacity: 0;`}
  }
`

// --- Menu ---
const Menu = styled.div<{ open: boolean }>`
  position: relative;
  overflow-y: auto;
  padding: 16px;
  margin: 0;
  width: 100%;
  transition: all 1.5s;
  opacity: 0;
  z-index: -1;
  ${({ open }) => open && `opacity: 1`};
  height: calc(100vh - 150px);
  ${mediaQuery.maxPhone} {
    padding-top: 0;
    height: calc(100vh - 170px);
  }
`

const MenuList = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0;
  transform: translate(-50%, -50%);
`

const MenuItem = styled.li`
  margin: 16px 0;
  ${mediaQuery.minTablet} {
    margin: 24px 0;
  }
`

const linkStyle = css`
  ${typography};
  color: ${(props: any) => props.theme.colors.white};
  display: block;
  font-weight: 700;
  text-align: center;
`

const MenuLink = styled(Link)<any>`
  ${linkStyle}
`

const MenuNormal = styled(Box)<any>`
  ${linkStyle}
`

const MobileTabletOnly = styled.div`
  ${mediaQuery.minDesktop} {
    display: none;
  }
`

// --- IconText ---
const StyledWrap = styled.div`
  cursor: pointer;
  display: inline-block;
  user-select: none;
`
const StyledIcon = styled.div`
  display: inline-block;
  font-size: 1.3rem;
  margin-right: 8px;
  overflow: hidden;
  svg { float: left; position: relative; top: 2px; }
`
const StyledText = styled.div`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
`

interface HeaderProps {
  nav: { text: string; slug: string }[]
  social: { facebook: string; instagram: string }
  copyright: { text: string }
  parkingRateHtml?: string
  sitemapImageUrl?: string
  sitemapImageWidth?: number
  sitemapImageHeight?: number
  validateOfficeTowerUrl?: string
  valetInstructionsUrl?: string
}

export default function Header({
  nav,
  social,
  copyright,
  parkingRateHtml,
  sitemapImageUrl,
  sitemapImageWidth,
  sitemapImageHeight,
  validateOfficeTowerUrl,
  valetInstructionsUrl,
}: HeaderProps) {
  const [open, set] = useState(false)
  const [openModal, setModal] = useState(false)

  return (
    <>
      {openModal && (
        <ParkingModal id="header-modal">
          <ParkingModalContent onClick={() => setModal(false)}>
            <ParkingModalImage>
              {sitemapImageUrl && (
                <Image
                  src={sitemapImageUrl}
                  alt="McKinney and Olive"
                  width={sitemapImageWidth || 800}
                  height={sitemapImageHeight || 600}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </ParkingModalImage>
            <ParkingModalBody>
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
                {valetInstructionsUrl && (
                  <Box mt={3} width={['100%', 400, null, '100%']}>
                    <Button
                      width="100%"
                      as="a"
                      href={valetInstructionsUrl}
                      target="_blank"
                    >
                      Valet Parking Validation Instructions
                    </Button>
                  </Box>
                )}
                {validateOfficeTowerUrl && (
                  <Box mt={3} width={['100%', 400, null, '100%']}>
                    <Button
                      width="100%"
                      as="a"
                      href={validateOfficeTowerUrl}
                      target="_blank"
                    >
                      Validate Office Tower Garage Parking
                    </Button>
                  </Box>
                )}
              </div>
              {parkingRateHtml && (
                <Box mt={4}>
                  <Box
                    mt={4}
                    dangerouslySetInnerHTML={{ __html: parkingRateHtml }}
                  />
                </Box>
              )}
            </ParkingModalBody>
          </ParkingModalContent>
        </ParkingModal>
      )}
      <Box
        bg={open ? 'primary' : 'white'}
        width={1}
        height={open ? '100vh' : ['73.64px', '98.19px']}
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
            <Link href="/" onClick={() => set(false)}>
              <Box width={[180, 240]}>
                {open ? (
                  <img src="/images/logo-white.svg" alt="McKinney and Olive logo" />
                ) : (
                  <img src="/images/logo.svg" alt="McKinney and Olive logo" />
                )}
              </Box>
            </Link>
            <Box display={['none', null, 'block']}>
              <Social>
                <SocialItem href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <StyledFacebookF color={open ? 'white' : 'primary'} />
                </SocialItem>
                <SocialItem href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <StyledInstagram color={open ? 'white' : 'primary'} />
                </SocialItem>
              </Social>
            </Box>
            <Box display="flex">
              <Box display={['none', null, 'flex']}>
                <Box mr={[null, 0, 4]}>
                  <StyledWrap>
                    <a
                      href="https://www.ng1.angus.mrisoftware.com/Tenant/default.aspx?CompanyName=Granite&WebsiteName=granite"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <StyledIcon>
                        <StyledUserTie color={open ? 'white' : 'primary'} />
                      </StyledIcon>
                      <StyledText>
                        <Box color={open ? 'white' : 'grays.0'}>
                          Customer<br />service
                        </Box>
                      </StyledText>
                    </a>
                  </StyledWrap>
                </Box>
                <Box mr={[null, 0, 5]} onClick={() => setModal(true)}>
                  <StyledWrap>
                    <StyledIcon>
                      <StyledParking color={open ? 'white' : 'primary'} />
                    </StyledIcon>
                    <StyledText>
                      <Box color={open ? 'white' : 'grays.0'}>
                        Parking<br />validation
                      </Box>
                    </StyledText>
                  </StyledWrap>
                </Box>
              </Box>
              <Hamburger open={open} onClick={() => set(!open)}>
                <div />
              </Hamburger>
            </Box>
          </Box>
        </Container>
        <Menu open={open}>
          <MenuList>
            {nav.map(({ text, slug }) => (
              <MenuItem key={slug}>
                <MenuLink fontSize={[3, '36px']} href={slug} onClick={() => set(false)}>
                  {text}
                </MenuLink>
              </MenuItem>
            ))}
            <MobileTabletOnly>
              <MenuItem>
                <MenuNormal
                  as="a"
                  fontSize={[3, '36px']}
                  href="https://www.ng1.angus.mrisoftware.com/Tenant/default.aspx?CompanyName=Granite&WebsiteName=granite"
                  target="_blank"
                >
                  Customer Service
                </MenuNormal>
              </MenuItem>
              <MenuItem>
                <MenuNormal fontSize={[3, '36px']} onClick={() => setModal(true)}>
                  Parking Validation
                </MenuNormal>
              </MenuItem>
              <Box display="flex" justifyContent="center">
                <SocialItem href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <StyledFacebookF color={open ? 'white' : 'primary'} />
                </SocialItem>
                <SocialItem href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <StyledInstagram color={open ? 'white' : 'primary'} />
                </SocialItem>
              </Box>
            </MobileTabletOnly>
          </MenuList>
        </Menu>
        <Box pt={[4]} px={2} width={1}>
          <Container>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={['center', null, 'space-between']}
            >
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
