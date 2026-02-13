import { getAsset, getAmenities } from '@/lib/contentful'
import pagesData from '@/lib/data/pages.json'
import AmenitiesPageClient from './amenities-client'

export const metadata = {
  title: 'Amenities | McKinney & Olive',
  description: 'Explore the amenities at McKinney & Olive',
}

export default async function AmenitiesPage() {
  const [
    hero, contentFeaturedImage, contentOneImage, contentTwoImage, contentThreeImage,
    conferenceCenterBrochure, fitnessStudioBrochure,
    restaurants, hotels,
    eastEndOpen, westEndOpen, northEndOpen, southEndOpen,
    chairsFacingEast, chairsFacingSouth, tablesFacingEast, tablesFacingSouth,
    small, large,
  ] = await Promise.all([
    getAsset('amenities_hero'),
    getAsset('outdoor_piazza'),
    getAsset('conference_centre'),
    getAsset('outdoor_terrace'),
    getAsset('fitness_studio'),
    getAsset('conference-center-brochure'),
    getAsset('fitness-studio-brochure'),
    getAmenities('Restaurant'),
    getAmenities('Hotel'),
    getAsset('cc-ushape-east-end-open'),
    getAsset('cc-ushape-west-end-open'),
    getAsset('cc-ushape-north-end-open'),
    getAsset('cc-ushape-south-end-open'),
    getAsset('cc-theater-chairs-facing-east'),
    getAsset('cc-theater-chairs-facing-south'),
    getAsset('cc-classroom-tables-facing-east'),
    getAsset('cc-classroom-tables-facing-south'),
    getAsset('cc-boardroom-small'),
    getAsset('cc-boardroom-large'),
  ])

  const { amenities } = pagesData as any

  return (
    <AmenitiesPageClient
      amenities={amenities}
      hero={hero}
      contentFeaturedImage={contentFeaturedImage}
      contentOneImage={contentOneImage}
      contentTwoImage={contentTwoImage}
      contentThreeImage={contentThreeImage}
      conferenceCenterBrochure={conferenceCenterBrochure}
      fitnessStudioBrochure={fitnessStudioBrochure}
      restaurants={restaurants}
      hotels={hotels}
      conferenceCentreImages={{
        eastEndOpen, westEndOpen, northEndOpen, southEndOpen,
        chairsFacingEast, chairsFacingSouth, tablesFacingEast, tablesFacingSouth,
        small, large,
      }}
    />
  )
}
