import React from 'react'

import { Table, THead, TBody, TFoot, TH, TR, TD } from './styles'

function TableComp({ children, ...rest }) {
  return <Table {...rest}>{children}</Table>
}

export { THead, TBody, TFoot, TH, TR, TD }
export default TableComp
