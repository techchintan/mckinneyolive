'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Map } from '@styled-icons/boxicons-solid/Map'
import { Time } from '@styled-icons/boxicons-regular/Time'
import { format, parseISO } from 'date-fns'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'

const HomeContent = ({
  home,
  bgUrl,
  announcement,
  title,
  announcementContent,
  onClick,
}: any) => {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width={1}
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
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
        <Box backgroundColor="rgba(48,126,175, 0.79)" py={[5, '100px']}>
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
                      {announcement.map((item: any) => {
                        const node = item.node || item
                        const dateTimestamp = node.date ? new Date(node.date).getTime() : 0
                        let nounceDate: string
                        if (dateTimestamp >= Date.now()) {
                          try {
                            nounceDate = format(parseISO(node.date), 'MMM dd')
                          } catch {
                            nounceDate = 'Current'
                          }
                        } else {
                          nounceDate = 'Current'
                        }

                        return (
                          <Box
                            key={node.id || node.sys?.id}
                            mb={3}
                            onClick={() => onClick(node)}
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
                                  {node.title || node.fields?.title}
                                  {node.time && (
                                    <Box display="flex" color="white" mt={2}>
                                      <Time size="24" style={{ flex: 'none' }} />
                                      <Box pl={3} color="white">
                                        {node.time}
                                      </Box>
                                    </Box>
                                  )}
                                  {node.location && (
                                    <Box display="flex" color="white" mt={2}>
                                      <Map size="24" style={{ flex: 'none' }} />
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
                            <Link href="/news">
                              <Button color="white" width={[1, 'auto']}>
                                View more
                              </Button>
                            </Link>
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
