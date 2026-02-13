"use client"

import { Container } from 'styled-bootstrap-grid'
import Hero from '@/components/ui/hero'
import Box from '@/components/ui/box'
import RichTextContentful from '@/components/ui/rich-text-contentful'
import { getImageUrl } from '@/lib/contentful'

interface SingleNewsClientProps {
  article: any
  hero: any
}

export default function SingleNewsClient({ article, hero }: SingleNewsClientProps) {
  const heroUrl = getImageUrl(hero)

  return (
    <>
      {heroUrl && <Hero image={heroUrl} alt={article.title} />}
      <Box id="content-start" py={[5, '100px']}>
        <Container>
          <Box as="h1" mt="0" mb={5}>{article.title}</Box>
          <RichTextContentful content={article.content} />
        </Container>
      </Box>
    </>
  )
}
