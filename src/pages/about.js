import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import me from "../images/IMG_6376.jpg"

const IndexPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="about-wrapper">
      <h2 className="text-center my-4">Об авторе</h2>
      <p>
        Всем привет! Меня зовут Орхан. Я живу в Санкт-Петербурге и работаю
        frontend разработчиком больше 4х лет.
      </p>
      <p>
        На этом сайте я делюсь своим опытом, пишу статьи о веб разработке и
        изучаю что-то новое. Этот блог для меня хобби и попытка
        систематизировать знания.
      </p>
      <div className="text-center">
        <img src={me} className="img-fluid" />
      </div>
    </div>
  </Layout>
)

export default IndexPage
