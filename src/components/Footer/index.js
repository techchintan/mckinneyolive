import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Container } from 'styled-bootstrap-grid'

import Box from '../Box'
import { Social, SocialItem } from '../Social'

import {
  StyledLink,
  StyledFacebookF,
  StyledVimeoV,
  StyledInstagram,
} from './styles'

import logoIconWhite from './logo_icon_type.svg'
import logoWhite from '../../images/logo-white.svg'

const Footer = () => {
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
    }
  `)

  const { social, copyright, privacy } = data.pagesJson.home
  const { nav } = data.site.siteMetadata

  return (
    <Box as="footer">
      <Box bg="secondary" py={5}>
        <Container>
          <Box
            display={[null, null, 'flex']}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width={[220, 220, 240]} mb={[4, null, 0]}>
              <Link to="/" style={{ display: 'inline-block' }}>
                <Box width={1} as="img" src={logoWhite} />
              </Link>
            </Box>
            <Box as="ul" p={0} m={0} display={[null, 'flex']}>
              {nav.map(item => (
                <Box
                  key={item.slug}
                  as="li"
                  style={{ listStyle: 'none' }}
                  px={[null, 2, 3]}
                >
                  <StyledLink color="white" to={item.slug}>
                    {item.text}
                  </StyledLink>
                </Box>
              ))}
            </Box>
            <Box width={[210, 210, 180]} mt={[4, null, 0]}>
              <a
                href="https://crescent.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block' }}
              >
                <Box width={1} as="img" src={logoIconWhite} />
              </a>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box py={4}>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box>
              <StyledLink color="grays.0" to={privacy.slug}>
                {privacy.text}
              </StyledLink>
            </Box>
            <Box>
              <Social>
                <SocialItem href={social.facebook} target="_blank">
                  <StyledFacebookF color="grays.1" />
                </SocialItem>
                <SocialItem href={social.instagram} target="_blank">
                  <StyledInstagram color="grays.1" />
                </SocialItem>
                <SocialItem href={social.vimeo} target="_blank">
                  <StyledVimeoV color="grays.1" />
                </SocialItem>
              </Social>
            </Box>
            <Box color="grays.0">
              {copyright.text} {new Date().getFullYear()}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
