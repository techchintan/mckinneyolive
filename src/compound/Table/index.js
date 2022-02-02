import React from 'react'

import { Table, THead, TBody, TFoot, Th, Tr, Td } from './styles'

function TableComp({ children, ...rest }) {
  return <Table {...rest}>{children}</Table>
}

export { THead, TBody, TFoot, Th, Tr, Td }
export default TableComp
