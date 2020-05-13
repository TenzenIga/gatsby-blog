import React from "react"
import Layout from "../components/layout"
import Img from 'gatsby-image';
import SEO from "../components/seo"
import cat from '../images/computer-cat.jpg'
const IndexPage = () => (
  <Layout>
    <SEO title="About" />
    <h2 className='text-center my-4' >Об авторе</h2>
    <p>Добро пожаловать на мой сайт. Я пока не придумал, что интересного написать о себе.
      Этот блог - попытка систематизировать знания и привести в порядок мысли.</p>
    <img src={cat} />
  </Layout>
)

export default IndexPage
