import { getAsset, getGallery } from '@/lib/contentful'
import GalleryPageClient from './gallery-client'

export const metadata = {
  title: 'Gallery | McKinney & Olive',
  description: 'Photo gallery of McKinney & Olive',
}

export default async function GalleryPage() {
  const [hero, gallery] = await Promise.all([
    getAsset('hero_gallery'),
    getGallery('Photo Gallery'),
  ])

  return <GalleryPageClient hero={hero} images={gallery} />
}
