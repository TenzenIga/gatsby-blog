import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';

export default function Post({title, date, path, image}) {
    return (
        <>
            <h4>{title}</h4>
            <Img fluid={image} />
            <p>{date}</p>
            <Link to={path}> Читать...</Link>
        </>
    )
}
