import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
})

// ------- Asset helpers -------

export async function getAssetByTitle(title: string) {
  const res = await client.getAssets({ 'fields.title': title, limit: 1 })
  return res.items[0] ?? null
}

export async function getAssetsByTitles(titles: string[]) {
  const res = await client.getAssets({
    'fields.title[in]': titles.join(','),
    limit: titles.length,
  })
  const map: Record<string, any> = {}
  for (const item of res.items) {
    map[item.fields.title as string] = item
  }
  return map
}

// ------- Entry helpers -------

export async function getEntriesByContentType(contentType: string, query: Record<string, any> = {}) {
  const res = await client.getEntries({
    content_type: contentType,
    ...query,
  })
  return res.items
}

export async function getEntryBySlug(contentType: string, slug: string) {
  const res = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
    include: 2,
  })
  return res.items[0] ?? null
}

// ------- Specific data fetchers -------

export async function getAllNews() {
  return getEntriesByContentType('news', { order: ['-fields.date'], include: 2 })
}

export async function getNewsBySlug(slug: string) {
  return getEntryBySlug('news', slug)
}

export async function getAllAnnouncements() {
  return getEntriesByContentType('announcements', { order: ['fields.date'], include: 2 })
}

export async function getAllAwards() {
  return getEntriesByContentType('awards', { order: ['-fields.date'], include: 2 })
}

export async function getAllYearCategories() {
  return getEntriesByContentType('yearCategories', { order: ['-fields.title'] })
}

export async function getAllTeams(category?: string) {
  const query: Record<string, any> = { order: ['fields.order'], include: 2 }
  if (category) {
    query['fields.category.sys.contentType.sys.id'] = 'teamCategory'
    query['fields.category.fields.title'] = category
  }
  return getEntriesByContentType('teams', query)
}

export async function getAllAmenities(categoryName: string) {
  return getEntriesByContentType('amenities', {
    order: ['fields.order'],
    include: 2,
    'fields.category.sys.contentType.sys.id': 'amenityCategory',
    'fields.category.fields.name': categoryName,
  })
}

export async function getAllBuildings() {
  return getEntriesByContentType('buildings', { include: 3 })
}

export async function getGallery(title: string) {
  const res = await client.getEntries({
    content_type: 'gallery',
    'fields.title': title,
    limit: 1,
    include: 2,
  })
  return res.items[0] ?? null
}

export async function getMarkdownBySlug(slug: string) {
  const res = await client.getEntries({
    content_type: 'markdown',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  })
  return res.items[0] ?? null
}

export async function getCorporatePolicy() {
  const res = await client.getEntries({
    content_type: 'corporatePolicy',
    limit: 1,
    include: 2,
  })
  return res.items[0] ?? null
}

// ------- Helper: extract image URL from Contentful asset -------

export function getImageUrl(asset: any): string {
  if (!asset) return ''
  if (asset?.fields?.file?.url) {
    const url = asset.fields.file.url as string
    return url.startsWith('//') ? `https:${url}` : url
  }
  return ''
}

export function getImageDimensions(asset: any): { width: number; height: number } {
  const details = asset?.fields?.file?.details?.image
  return {
    width: details?.width ?? 1200,
    height: details?.height ?? 800,
  }
}

export default client
