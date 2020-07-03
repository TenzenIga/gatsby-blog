import React from "react"
import Layout from "../components/layout"
import Img from 'gatsby-image';
import SEO from "../components/seo"
import cat from '../images/computer-cat.jpg'
const IndexPage = () => (
  <Layout>
    <SEO title="About" />
    <h2 className='text-center my-4' >Об авторе</h2>
    <p>Меня зовут Гаджизаде Орхан. Я фронтенд разработчик из Питера. На этом сайте я делюсь своим опытом,
       пишу статьи о веб разработке и изучаю что-то новое.
       Этот блог для меня хобби и попытка систематизировать знания.</p>
    <div className='text-center'>
    <img src={cat} className="img-fluid" />
    </div>

  </Layout>
)

export default IndexPage
