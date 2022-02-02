import React from 'react'
import { Container } from 'styled-bootstrap-grid'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Box from '../components/Box'

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <Container>
      <Box py={[6, 7]}>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Box>
    </Container>
  </Layout>
)

export default NotFoundPage
