'use client'

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'
import theme from '@/lib/theme'
import { GlobalStyle } from './global-style'

const gridTheme = {
  row: { padding: 16 },
  col: { padding: 16 },
  container: { padding: 16 },
}

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={gridTheme}>
        <GlobalStyle />
        {children}
      </GridThemeProvider>
    </ThemeProvider>
  )
}
