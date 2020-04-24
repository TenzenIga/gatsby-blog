import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import {slugify} from '../util/util';

export default function Post({title, date, path, image, content, tags}) {
    return (
        <>
            <h4>{title}</h4>
            <Img fluid={image} />
            <p>{date}</p>
    {tags.map( tag => <Link to={`/tag/${slugify(tag)}`} >{tag}</Link>) }
           <p>{content}</p>
            <Link to={path}> Читать...</Link>
        </>
    )
}
