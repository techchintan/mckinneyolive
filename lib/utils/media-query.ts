const min = (width: number) => `(min-width: ${width}em)`
const max = (width: number) => `(max-width: ${width}em)`

const screens = {
  phone: 48,
  tablet: 62,
  desktop: 75,
} as const

const mediaQuery: Record<string, any> = { screens }

for (const key of Object.keys(screens) as Array<keyof typeof screens>) {
  const Key = key.charAt(0).toUpperCase() + key.slice(1)
  for (const [func, name] of [
    [min, 'min'],
    [max, 'max'],
  ] as const) {
    const query = (func as (w: number) => string)(screens[key])
    mediaQuery[`${name}${Key}`] = `@media ${query}`
    mediaQuery[`${name}${Key}Js`] = query
  }
}

export default mediaQuery as {
  screens: typeof screens
  minPhone: string
  maxPhone: string
  minTablet: string
  maxTablet: string
  minDesktop: string
  maxDesktop: string
  [key: string]: any
}
