'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'
import { FacebookF, Instagram } from '@styled-icons/fa-brands'
import { color } from 'styled-system'

import Box from '@/components/ui/box'
import { Social, SocialItem } from '@/components/ui/social'

const StyledLink = styled(Link)<any>`
  ${color};
  text-decoration: none;
`
const StyledFacebookF = styled(FacebookF)<any>`
  ${color};
  width: 12px;
`
const StyledInstagram = styled(Instagram)<any>`
  ${color};
  width: 18px;
`

interface FooterProps {
  nav: { text: string; slug: string }[]
  social: { facebook: string; instagram: string }
  copyright: { text: string }
}

export default function Footer({ nav, social, copyright }: FooterProps) {
  return (
    <Box as="footer">
      <Box bg="secondary" py={5}>
        <Container>
          <Box
            display={[null, null, null, 'flex']}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width={200} mb={[4, null, null, 0]}>
              <Link href="/" style={{ display: 'inline-block' }}>
                <Box width={1} as="img" src="/images/logo-white.svg" alt="McKinney and Olive logo" />
              </Link>
            </Box>
            <Box as="ul" p={0} m={0} display={[null, 'flex']}>
              {nav.map((item) => (
                <Box
                  key={item.slug}
                  as="li"
                  style={{ listStyle: 'none' }}
                  px={[null, 2, 3]}
                >
                  <StyledLink color="white" href={item.slug}>
                    {item.text}
                  </StyledLink>
                </Box>
              ))}
            </Box>
            <Box width={140} mt={[4, null, null, 0]}>
              <Box as="img" src="/images/granite-logo-white.png" alt="Granite Properties" />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box py={4}>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={['center', 'space-between']}
            flexWrap="wrap"
          >
            <Box mb={[2, 0]} mr={4}>
              <Social>
                <SocialItem href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <StyledFacebookF color="grays.1" />
                </SocialItem>
                <SocialItem href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <StyledInstagram color="grays.1" />
                </SocialItem>
              </Social>
            </Box>
            <Box color="grays.0" fontSize="14px">
              {copyright.text} {new Date().getFullYear()}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
