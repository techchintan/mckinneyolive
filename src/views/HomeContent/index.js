import React from 'react'
import styled from 'styled-components'
import BGImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Time } from '@styled-icons/boxicons-regular/Time'
import Box from '../../components/Box'
import Heading from '../../components/Heading'
import Button from '../../components/Button'

const BackgroundImage = styled(BGImage)`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
`

const StyledLink = styled(Link)``

const HomeContent = ({
  home,
  bg,
  announcement,
  title,
  announcementContent,
  onClick,
}) => {
  const image = getImage(bg)
  const bgImage = convertToBgImage(image)

  return (
    <Box position="relative">
      <Box position="absolute" top="0" left="0" height="100%" width={1}>
        <BackgroundImage {...bgImage} preserveStackingContext />
      </Box>
      <Box backgroundColor="rgba(0,0,0,0.6)" position="relative" zIndex={10}>
        <Container>
          <Box
            textAlign="center"
            color="white"
            fontSize={[4, '30px']}
            lineHeight="1.1944444444"
            fontWeight={700}
            py={[5, 6]}
          >
            {home.content}
          </Box>
        </Container>
        <Box
          id="whats-happening"
          backgroundColor="rgba(48,126,175, 0.79)"
          py={[5, '100px']}
        >
          <Container>
            <Row>
              <Col col={12} xl={10} xlOffset={1}>
                <Row>
                  <Col md={6} mdOffset={3}>
                    <Heading
                      color="white"
                      fontSize={[4, '36px']}
                      mb={[3, '40px']}
                      lineHeight={1}
                    >
                      {title}
                    </Heading>
                    <Box color="white" mb={[5, 5, 5, 0]}>
                      {announcement.map(({ node }) => {
                        let nounceDate
                        if (
                          node.announcementDateTimestamp >= new Date().getTime()
                        ) {
                          nounceDate = moment
                            .parseZone(node.date)
                            .format('MMM DD')
                        } else {
                          nounceDate = 'Current'
                        }

                        return (
                          <Box
                            key={node.id}
                            mb={3}
                            onClick={() => onClick(node)}
                            href="/"
                            css="cursor: pointer"
                          >
                            <Row>
                              <Col col={3}>{nounceDate}</Col>
                              <Col col={9}>
                                <Box
                                  display="block"
                                  fontWeight={700}
                                  color="white"
                                  mb={3}
                                >
                                  {node.title}
                                  {!isEmpty(node.time) && (
                                    <Box display="flex" color="white" mt={2}>
                                      <Time size="24" css="flex: none" />
                                      <Box pl={3} color="white">
                                        {node.time}
                                      </Box>
                                    </Box>
                                  )}
                                  {!isEmpty(node.location) && (
                                    <Box display="flex" color="white" mt={2}>
                                      <Map size="24" css="flex: none" />
                                      <Box pl={3} color="white">
                                        {node.location}
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              </Col>
                            </Row>
                          </Box>
                        )
                      })}
                      <Row>
                        <Col col={12} md={9} mdOffset={3}>
                          <Box mb={4}>
                            <StyledLink to="/news">
                              <Button color="white" width={[1, 'auto']}>
                                View more
                              </Button>
                            </StyledLink>
                          </Box>
                        </Col>
                      </Row>
                      <Row>
                        <Col col={12}>
                          <Box
                            dangerouslySetInnerHTML={{
                              __html: announcementContent,
                            }}
                          />
                        </Col>
                      </Row>
                    </Box>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeContent
