'use client'

import React from 'react'
import Link from 'next/link'
import { Container } from 'styled-bootstrap-grid'
import Box from '@/components/ui/box'
import Button from '@/components/ui/button'
import Heading from '@/components/ui/heading'

const HeaderLinks = ({ home }: { home: any }) => (
  <Container>
    <Box py={[5, '100px']}>
      <Heading
        as="h1"
        fontSize={[4, 6, null, '54px']}
        mb={[3, 4]}
        textAlign="center"
      >
        <div dangerouslySetInnerHTML={{ __html: home.heading }} />
      </Heading>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        backgroundColor="white"
      >
        {home.links.map(({ slug, label }: any) => (
          <Box key={slug} width={[1, 'auto']} my={2} px={2}>
            <Link href={slug}>
              <Button px={4} width={[1, 'auto']}>
                {label}
              </Button>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  </Container>
)

export default HeaderLinks
