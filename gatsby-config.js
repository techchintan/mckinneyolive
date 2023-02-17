require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `McKinney & Olive`,
    description: `An address of distinction`,
    author: `June Leoman Lapera <leomanlapera@gmail.com>`,
    siteUrl: `https://www.mckinneyandolive.com/`,
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
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.mckinneyandolive.com/`,
        sitemap: 'https://www.mckinneyandolive.com/sitemap.xml',
      },
    },
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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mckinneyolive`,
        short_name: `mckinneyolive`,
        start_url: `/`,
        background_color: `#005586`,
        theme_color: `#005586`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
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
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-152900182-1`,
      },
    },
    {
      resolve: `instagram-source-plugin`,
      options: {
        username: `3291151658`,
        access_token: process.env.FACEBOOK_GRAPH_API_TOKEN,
        instagram_id: `17841403349761393`,
        paginate: 1,
        maxPosts: 12,
      },
    },
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `schema.gql`,
        update: false,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
