import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {slugify} from '../util/util';
import { Badge, Button } from 'react-bootstrap';

let tagInfo = {
 JavaScript:'посты о JavaScript',
  NBD: "(сокр. Never Been Done) посты, где впервые знакомлюсь(методом проб и ошибок) с какой-нибудь технологией/инструментом",
  'React Native': "мобильная разработка с React Native",
  React: 'посты о React',
  code: 'общий тег для статей про кодинг, не вписывающихся в конкретные теги',
  offtop: 'посты на отвлеченные от программирования темы',
  angular:'посты о Angular'
}


const tagsPage = ({pageContext}) => {
    const {tags, tagPostsCounts} = pageContext;
    
    return (
        <Layout>
            <SEO title='Теги' />  
            <h2 className='text-center my-4' > Теги</h2>
            <div>
                {tags.map(tag=>(
                    <div className='d-flex align-items-baseline' key={tag} >
                    <Button href={`/tag/${slugify(tag)}`}  className='px-1 text-decoration-none flex-shrink-0' variant="link"  >{tag}      <Badge bg='primary' text='light' >
                        {tagPostsCounts[tag]}  
                        </Badge>     </Button>
                     
                         <p>- {tagInfo[tag]} </p>
                    </div>
            
                ))}
            </div>  
        </Layout>
    )
}

export default tagsPage;