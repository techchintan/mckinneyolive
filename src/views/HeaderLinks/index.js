import React from 'react'
import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'
import { Link } from 'gatsby'

import Box from '../../components/Box'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

const StyledLink = styled(Link)``

export default ({ home }) => (
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
        {home.links.map(({ slug, label }) => (
          <Box key={slug} width={[1, 'auto']} my={2} px={[2, 3]}>
            <StyledLink to={slug}>
              <Button px={4} width={[1, 186]}>
                {label}
              </Button>
            </StyledLink>
          </Box>
        ))}
      </Box>
    </Box>
  </Container>
)
