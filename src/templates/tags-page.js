import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {slugify} from '../util/util';
import { Link } from 'gatsby';


const tagsPage = ({pageContext}) => {
    const {tags, tagPostsCounts} = pageContext;
    return (
        <Layout>
            <SEO title='Теги' />  
            <ul>
                {tags.map(tag=>(
                    <li key={tag}>
                        <Link to={`/tag/${slugify(tag)}`} >
                        {tag} {tagPostsCounts[tag]}    
                        </Link> 
                    </li>
                ))}
            </ul>  
        </Layout>
    )
}

export default tagsPage;