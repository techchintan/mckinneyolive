const path = require(`path`)
const { GraphQLFloat } = require(`gatsby/graphql`)
const newsTemplate = path.resolve(`./src/templates/single-news.js`)

const query = `
  {
    news: allContentfulNews {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const response = await graphql(query)
  if (response.errors) throw new Error(response.errors)
  const { news } = response.data

  news.edges.forEach(({ node }) => {
    const { slug } = node
    createPage({
      path: slug,
      component: newsTemplate,
      context: { slug },
    })
  })
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === 'ContentfulAnnouncements') {
    return {
      announcementDateTimestamp: {
        type: GraphQLFloat,
        resolve: (source) => {
          return source.date ? new Date(source.date).getTime() : null
        },
      },
    }
  }
  return {}
}
