import React, { useState } from 'react'
import styled from 'styled-components'
import RichTextContentful from '../RichTextContentful'

import Box from '../Box'
import { date, title, content, wrap } from './styles'

const StyledWrap = styled(Box)`
  ${wrap}
`
const StyledDate = styled(Box)`
  ${date}
`
const StyledTitle = styled(Box)`
  ${title}
`
const StyledContent = styled(Box)`
  ${content}
`

function Date({ date, ...rest }) {
  return <StyledDate {...rest}>{date}</StyledDate>
}

function Title({ title, ...rest }) {
  return <StyledTitle {...rest}>{title}</StyledTitle>
}

function Content({ children, active, ...rest }) {
  return <>{active && <StyledContent {...rest}>{children}</StyledContent>}</>
}

function AccordionItem({ date, title, content, ...rest }) {
  const [active, set] = useState(false)
  return (
    <StyledWrap {...rest} onClick={() => set(!active)}>
      <Box width="20%">
        <Date date={date} />
      </Box>
      <Box width="80%">
        <Title active={active} title={title} />
        <Content active={active}>
          <RichTextContentful content={content} />
        </Content>
      </Box>
    </StyledWrap>
  )
}

export default AccordionItem
