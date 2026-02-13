'use client'

import React from 'react'
import styled from 'styled-components'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const Bold = ({ children }: any) => <span>{children}</span>
const Text = ({ children }: any) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri}>{children}</a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: any) => {
      const url = node.data?.target?.fields?.file?.url
      return (
        <a
          href={url ? `https:${url}` : '#'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {node.content?.[0]?.value}
        </a>
      )
    },
  },
}

export const Wrapper = styled.div`
  p span,
  p a {
    font-weight: bold;
  }
  blockquote {
    margin: 20px auto 40px;
    text-align: center;
    max-width: 900px;
  }
`

const RichText = ({ content }: { content: any }) => {
  if (!content) return null

  // Contentful SDK returns the document directly (not { raw })
  // Handle both raw string and document object
  let doc = content
  if (typeof content === 'string') {
    try {
      doc = JSON.parse(content)
    } catch {
      return null
    }
  }
  // Handle Gatsby-style { raw } format
  if (doc?.raw) {
    try {
      doc = JSON.parse(doc.raw)
    } catch {
      return null
    }
  }

  if (!doc?.nodeType) return null

  return <Wrapper>{documentToReactComponents(doc, options)}</Wrapper>
}

export default RichText
