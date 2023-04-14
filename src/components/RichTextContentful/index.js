import React from 'react'
import styled from 'styled-components'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

const Bold = ({ children }) => <span>{children}</span>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri}>{children}</a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node) => {
      return (
        <a
          href={`https:${node.data.target.file.url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {node.content[0].value}
        </a>
      )
    },
  },
}

const RichText = ({ content }) => {
  if (content) return <Wrapper>{renderRichText(content, options)}</Wrapper>
  return null
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

export default RichText
