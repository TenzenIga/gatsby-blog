import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image';
import {slugify} from '../util/util';

export default function singlePost({data}) {
    const post = data.markdownRemark.frontmatter
    return (
        <Layout>
            <SEO title = {post.title} />
            <h1>{post.title}</h1>
            <Img fluid = {post.image.childImageSharp.fluid} />
            <span>{post.date}</span>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}} />
            <ul>
                {post.tags.map(tag =>(
                    <Link key={tag} to={`/tag/${slugify(tag)}`}>
                        {tag}
                    </Link>
                ))}
            </ul>
        </Layout>
    )
}


export const postQuery = graphql`
    query blogPostBySlug($slug: String!){
        markdownRemark(fields: { slug: { eq: $slug}}){
            id
            html
            frontmatter{
                title
                date(formatString: "Do MMMM YYYY")
                tags
                image{
                    childImageSharp{
                        fluid(maxWidth: 700){
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            
        }
    }
`