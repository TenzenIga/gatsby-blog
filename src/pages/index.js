import React from "react"
 import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Посты</h1>
    <StaticQuery query={indexQuery} render={data => {
      return(
        <div>
          { data.allMarkdownRemark.edges.map(({node})=> (<Post
            key={node.id}
            title={node.frontmatter.title}
            date={node.frontmatter.date} 
            slug={node.fields.slug}
            content={node.excerpt}
            tags={node.frontmatter.tags}
            image={node.frontmatter.image.childImageSharp.fluid}  />
          ))}
        </div>
      )
    }}
     /> 
  </Layout>
)

const indexQuery = graphql`
query indexQuery {
	allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }){
    edges{
      node{
        id
				frontmatter{
          title
          date(formatString: "DD MMMM, YYYY")
          path
          tags
          image{
            childImageSharp{
              fluid(maxWidth: 600){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields{
          slug
      }
        excerpt
      }
    }
  }
}
`

export default IndexPage
