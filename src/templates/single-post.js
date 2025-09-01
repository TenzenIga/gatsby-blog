import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'

import Img from 'gatsby-image';
import {slugify} from '../util/util';
import {Row, Col, Card, Badge}  from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import { DiscussionEmbed } from 'disqus-react';
import SEO from '../components/seo';


export default function singlePost({data, pageContext}) {
    const post = data.markdownRemark.frontmatter
    
    const baseUrl = 'http://localhost:8000/'
    const disqusShortName = 'mycoolblog';
    const config ={
        identifier:data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
        }

    return (
        <Layout>
            <SEO title = {post.title} />
            <h2 className='my-4' >{post.title}</h2>
            <Row>
                <Col md='8'>
                <Card>
                <Img fluid = {post.image.childImageSharp.fluid} />
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted" >
                            {post.date}
                        </Card.Subtitle>
                    
                        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}} />      
                        <div>
                {post.tags.map(tag =>(
                  <Link key={tag} to={`/tag/${slugify(tag)}`} className='mr-1' >
                        <Badge variant="primary" > {tag}</Badge>
                    </Link>
                ))}
            </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md='4'>
                    <Sidebar />
                </Col>
            </Row> 
        <DiscussionEmbed shortname={disqusShortName} config={config} />
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