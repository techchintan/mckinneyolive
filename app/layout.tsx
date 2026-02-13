import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import Script from 'next/script'
import StyledComponentsRegistry from '@/components/layout/styled-components-registry'
import AppThemeProvider from '@/components/layout/theme-provider'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { getAssetByTitle, getImageUrl, getImageDimensions, getMarkdownBySlug } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: {
    template: '%s | McKinney & Olive',
    default: 'McKinney & Olive',
  },
  description: 'An address of distinction',
  metadataBase: new URL('https://www.mckinneyandolive.com'),
  openGraph: {
    type: 'website',
    siteName: 'McKinney & Olive',
  },
}

export const viewport: Viewport = {
  themeColor: '#005586',
}

const nav = [
  { text: 'About', slug: '/about' },
  { text: "What's Happening", slug: '/#whats-happening' },
  { text: 'Amenities', slug: '/amenities' },
  { text: 'Leasing', slug: '/leasing' },
  { text: 'Location', slug: '/location' },
  { text: 'Gallery', slug: '/gallery' },
  { text: 'News', slug: '/news' },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { social, copyright } = pagesData.home

  // Fetch header-specific Contentful data
  let parkingRateHtml = ''
  let sitemapImageUrl = ''
  let sitemapImageWidth = 800
  let sitemapImageHeight = 600
  let validateOfficeTowerUrl = ''
  let valetInstructionsUrl = ''

  try {
    const [parkingRate, sitemapAsset, validateAsset, valetAsset] = await Promise.all([
      getMarkdownBySlug('parking-rates'),
      getAssetByTitle('sitemap'),
      getAssetByTitle('Validate Office Tower Garage Parking'),
      getAssetByTitle('Valet Parking Validation Instructions'),
    ])

    if (parkingRate) {
      const copy = (parkingRate.fields as any).copy
      if (copy?.fields?.copy) {
        parkingRateHtml = copy.fields.copy
      }
    }

    if (sitemapAsset) {
      sitemapImageUrl = getImageUrl(sitemapAsset)
      const dims = getImageDimensions(sitemapAsset)
      sitemapImageWidth = dims.width
      sitemapImageHeight = dims.height
    }

    if (validateAsset) {
      validateOfficeTowerUrl = getImageUrl(validateAsset)
    }
    if (valetAsset) {
      valetInstructionsUrl = getImageUrl(valetAsset)
    }
  } catch (e) {
    // Contentful may not be configured yet
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={archivo.className}>
        <StyledComponentsRegistry>
          <AppThemeProvider>
            <Header
              nav={nav}
              social={{ facebook: social.facebook, instagram: social.instagram }}
              copyright={copyright}
              parkingRateHtml={parkingRateHtml}
              sitemapImageUrl={sitemapImageUrl}
              sitemapImageWidth={sitemapImageWidth}
              sitemapImageHeight={sitemapImageHeight}
              validateOfficeTowerUrl={validateOfficeTowerUrl}
              valetInstructionsUrl={valetInstructionsUrl}
            />
            <main>{children}</main>
            <Footer
              nav={nav}
              social={{ facebook: social.facebook, instagram: social.instagram }}
              copyright={copyright}
            />
          </AppThemeProvider>
        </StyledComponentsRegistry>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-57VQH6XMQE"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-57VQH6XMQE');
          `}
        </Script>
      </body>
    </html>
  )
}
