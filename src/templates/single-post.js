import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image';
import {slugify} from '../util/util';
import {Row, Col, Card, Badge}  from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

export default function singlePost({data}) {
    const post = data.markdownRemark.frontmatter
    return (
        <Layout>
            <SEO title = {post.title} />
            <h2 className='text-center my-4' >{post.title}</h2>
            <Row>
                <Col md='8'>
                <Card>
                <Img fluid = {post.image.childImageSharp.fluid} />
                    <Card.Body>
                        <Card.Subtitle>
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