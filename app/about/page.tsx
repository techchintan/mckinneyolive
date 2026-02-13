import { getAsset, getTeams } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'
import AboutPageClient from './about-client'

export const metadata = {
  title: 'About | McKinney & Olive',
  description: 'Learn about McKinney & Olive - Premier office tower in Uptown Dallas',
}

export default async function AboutPage() {
  const [hero, teamHero, contentOneImage, contentTwoImage, theCrescentImage, aboutBrochure, leedCaseStudy, mooBeeImage, management] = await Promise.all([
    getAsset('about_hero'),
    getAsset('the-team'),
    getAsset('think_sustainable'),
    getAsset('twg-summer'),
    getAsset('image_content_placeholder'),
    getAsset('about-brochure'),
    getAsset('leed-case-study'),
    getAsset('moo-bee-about'),
    getTeams('Management'),
  ])

  const { about } = pagesData as any

  return (
    <AboutPageClient
      about={about}
      hero={hero}
      teamHero={teamHero}
      contentOneImage={contentOneImage}
      contentTwoImage={contentTwoImage}
      theCrescentImage={theCrescentImage}
      aboutBrochure={aboutBrochure}
      leedCaseStudy={leedCaseStudy}
      mooBeeImage={mooBeeImage}
      management={management}
    />
  )
}
