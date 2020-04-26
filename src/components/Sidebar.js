import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { Card } from "react-bootstrap";
import Img from 'gatsby-image';
export default function Sidebar() {
    return (
        <>
        <Card className='border-0'>
            <Card.Body>
                <Card.Title className='text-center'>
                    Последние посты
                </Card.Title>
                <StaticQuery query={sidebarQuery} render={(data)=>(
                    <div>
                        {data.allMarkdownRemark.edges.map(({node}) =>(
                            <Card key={node.id} className='my-2'>
                                <Link to={node.frontmatter.path}>
                                    <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid} />
                                </Link>
                                <Card.Title className='m-2'>
                                    {node.frontmatter.title}
                                </Card.Title>
                            </Card>
                        ))}
                    </div>
                )} />              
            </Card.Body>
        </Card>
            
        </>
    )
}


const sidebarQuery = graphql`
    query{
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 3
        ){
            edges{
                node{
                    id
                    frontmatter{
                        title
                        path
                        image{
                            childImageSharp{
                            fluid(maxWidth: 300){
                                ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`