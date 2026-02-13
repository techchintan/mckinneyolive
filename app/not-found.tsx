import Link from 'next/link'
import { Container } from 'styled-bootstrap-grid'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container>
      <Box py={[5, '100px']} textAlign="center">
        <Heading as="h1" fontSize={[5, '48px']} mb={4}>
          Page Not Found
        </Heading>
        <Box mb={4} fontSize={3} color="grays.0">
          {"The page you're looking for doesn't exist."}
        </Box>
        <Link href="/" passHref legacyBehavior>
          <Button as="a">Go Home</Button>
        </Link>
      </Box>
    </Container>
  )
}
