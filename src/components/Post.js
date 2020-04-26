import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import {slugify} from '../util/util';
import { Col, Card, Badge, Button } from 'react-bootstrap';
export default function Post({title, date, slug, image, content, tags}) {
    return (
        <Col sm={6} className='my-2'>
        <Card >
            <Link to={slug}>
            <Img fluid={image} />
            </Link>
      
        <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
    <Card.Text>{content}</Card.Text>
    <div className='d-flex'>
    {tags.map( tag =>
        <Link key={tag} to={`/tag/${slugify(tag)}`} className='mr-1' >
             <Badge variant="primary" > {tag}</Badge>
        </Link>
        )}
    <Button href={slug} className='ml-auto text-decoration-none' variant="link"  >Читать »</Button>
    </div>
   

    
  </Card.Body>
        </Card> 
        </Col>
    )
}
