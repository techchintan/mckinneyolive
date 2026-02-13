"use client"

import Image from 'next/image'
import styled from 'styled-components'
import Box from '@/components/ui/box'
import mediaQuery from '@/lib/utils/media-query'

const Wrapper = styled(Box)`
  display: grid;
  padding: 8px;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;
  ${mediaQuery.minTablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  ${mediaQuery.minDesktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`

interface InstaNode {
  id: string
  caption?: string
  permalink?: string
  media_url?: string
  localFile?: {
    childImageSharp?: {
      gatsbyImageData?: any
    }
  }
}

interface InstagramGalleryProps {
  posts: InstaNode[]
}

export default function InstagramGallery({ posts }: InstagramGalleryProps) {
  if (!posts || posts.length === 0) return null

  return (
    <Wrapper>
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink || `https://www.instagram.com/p/${post.id}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', position: 'relative', height: '240px' }}
        >
          {post.media_url && (
            <Image
              src={post.media_url}
              alt={post.caption || 'Instagram post'}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </a>
      ))}
    </Wrapper>
  )
}
