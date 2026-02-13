'use client'

import React from 'react'
import styled from 'styled-components'
import Box from '@/components/ui/box'

const Table = styled(Box)``
const THead = styled(Box)`
  font-weight: 700;
  text-align: left;
`
const TBody = styled(Box)``
const TFoot = styled(Box)``
const Th = styled(Box)`
  color: ${(props: any) => props.theme.colors.white};
  cursor: pointer;
  line-height: normal;
  text-transform: uppercase;
  &:hover {
    background-color: ${(props: any) => props.theme.colors.primary};
  }
`
const Tr = styled(Box)``
const Td = styled(Box)`
  color: ${(props: any) => props.theme.colors.white};
`

Table.defaultProps = { as: 'table' }
THead.defaultProps = { as: 'thead' }
TBody.defaultProps = { as: 'tbody' }
TFoot.defaultProps = { as: 'tfoot' }
Th.defaultProps = {
  as: 'th',
  py: '24px',
  px: '30px',
  bg: 'primary',
  color: 'white',
  fontSize: 4,
}
Tr.defaultProps = { as: 'tr' }
Td.defaultProps = {
  as: 'td',
  px: '30px',
  py: 3,
}

function TableComp({ children, ...rest }: any) {
  return <Table {...rest}>{children}</Table>
}

export { THead, TBody, TFoot, Th, Tr, Td }
export default TableComp
