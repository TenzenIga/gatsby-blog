import React from 'react'
import Layout from '../components/layout'
import { graphql} from 'gatsby'
import SEO from '../components/seo'
import {Row}  from 'react-bootstrap';
import Post from '../components/Post'


export default function tagPosts({data, pageContext}) {
    const {tag} =  pageContext;
    return (
        <Layout>
            <SEO title = {tag} />
            <h2 className='text-center my-4' >{tag}</h2>
        <Row>
          { data.allMarkdownRemark.edges.map(({node})=> (<Post
            key={node.id}
            title={node.frontmatter.title}
            date={node.frontmatter.date} 
            slug={node.fields.slug}
            content={node.excerpt}
            tags={node.frontmatter.tags}
            image={node.frontmatter.image.childImageSharp.fluid}  />
          ))}
        </Row>
        </Layout>
    )

}

export const tagsQuery = graphql`
query($tag: String!){
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: {in: [$tag]}}}
        ){
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
                    fluid(maxWidth: 500){
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