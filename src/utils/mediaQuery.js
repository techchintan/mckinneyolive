import { startCase } from 'lodash'

const min = width => `(min-width: ${width}em)`
const max = width => `(max-width: ${width}em)`

const mediaQuery = {
  screens: {
    // screen sizes in em units
    phone: 48,
    tablet: 62,
    desktop: 75,
  },
}

for (const key of Object.keys(mediaQuery.screens)) {
  const Key = startCase(key)
  for (const [func, name] of [
    [min, `min`],
    [max, `max`],
  ]) {
    // css query
    const query = func(mediaQuery.screens[key])
    mediaQuery[name + Key] = `@media ` + query
    // js query (see window.matchMedia)
    mediaQuery[name + Key + `Js`] = query
  }
}

export default mediaQuery
