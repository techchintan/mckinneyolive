'use client'

import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import RichTextContentful from './rich-text-contentful'
import Box from './box'

const wrap = css`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
`

const date = css`
  font-weight: 700;
`

const titleStyle = css<any>`
  font-weight: 700;
  position: relative;
  padding-right: 20px;

  &::before,
  &::after {
    background-color: ${(props: any) => props.theme.colors.primary};
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }

  &::before {
    width: 1rem;
    height: 2px;
    top: 6.5px;
  }

  &::after {
    display: ${(props: any) => (props.$active ? 'none' : 'block')};
    width: 2px;
    height: 1rem;
    right: 7px;
  }
`

const StyledWrap = styled(Box)`${wrap}`
const StyledDate = styled(Box)`${date}`
const StyledTitle = styled(Box)<any>`${titleStyle}`
const StyledContent = styled(Box)``

function AccordionItem({ date, title, content, ...rest }: any) {
  const [active, set] = useState(false)
  return (
    <StyledWrap {...rest} onClick={() => set(!active)}>
      <Box width="20%">
        <StyledDate>{date}</StyledDate>
      </Box>
      <Box width="80%">
        <StyledTitle $active={active}>{title}</StyledTitle>
        {active && (
          <StyledContent>
            <RichTextContentful content={content} />
          </StyledContent>
        )}
      </Box>
    </StyledWrap>
  )
}

export default AccordionItem
