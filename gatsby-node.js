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
        resolve: source => {
          return new Date(source.date).getTime()
        },
      },
    }
  }
  return {}
}

// Customise Graphql Schema

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
      type ContentfulTeams implements Node {
        image: ContentfulAsset
      }

      type contentfulAnnouncementsContentRichTextNode implements Node {
        json: JSON
      }
  
      type ContentfulAnnouncements implements Node {
        title: String
        date: Date
        image: ContentfulAsset
        location: String
        time: String
        content: contentfulAnnouncementsContentRichTextNode

      }

      type ContentfulAnnouncementsEdge {
        node: ContentfulAnnouncements
      }

      type ContentfulAnnouncementsConnection {
        edges: [ContentfulAnnouncementsEdge]
      }

      type InstaNode implements Node {
        timestamp: Int
        username: String
        caption: String
        localFile: File
      }

      type InstaNodeEdge {
        node: InstaNode
      }

      type InstaNodeConnection {
        edges: [InstaNodeEdge]
      }

      type Query {
        allContentfulAnnouncements: ContentfulAnnouncementsConnection
        allInstaNode: InstaNodeConnection
      }
   `
  createTypes(typeDefs)
}
