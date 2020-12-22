require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `McKinney & Olive`,
    description: `An address of distinction`,
    author: `@leomanlapera`,
    nav: [
      { text: 'About', slug: '/about' },
      { text: 'Amenities', slug: '/amenities' },
      { text: 'Leasing', slug: '/leasing' },
      { text: 'Location', slug: '/location' },
      { text: 'Gallery', slug: '/gallery' },
      { text: 'News', slug: '/news' },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#005586`,
        theme_color: `#005586`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Archivo:400,700'],
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-152900182-1`,
      },
    },
    // username: `thecrescentdallas`,
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `3291151658`,
      },
    },
  ],
}
