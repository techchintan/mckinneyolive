import React from 'react'
import PropTypes from 'prop-types'
import { GridThemeProvider } from 'styled-bootstrap-grid'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Header from '../Header'
import Footer from '../Footer'
import { GlobalStyle } from './styles'

const gridTheme = {
  row: { padding: 16 },
  col: { padding: 16 },
  container: { padding: 16 },
}

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={gridTheme}>
        <GlobalStyle />
        <Header />
        <main>{children}</main>
        <Footer />
      </GridThemeProvider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
