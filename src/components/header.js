
import PropTypes from "prop-types"
import React from "react"
import {Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "gatsby";


const Header = ({ siteTitle }) =>{
  
  return (
    <header >
<Navbar bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/" >{siteTitle}</Navbar.Brand>
    <Nav className="mr-auto">
      <Link to="/" className='nav-link' activeClassName='active'>Посты</Link>
      <Link to="/tags"  className='nav-link'  activeClassName='active' >Теги</Link>
      <Link to="/about" className='nav-link'  activeClassName='active' >Об авторе</Link>
    </Nav>
  </Container>
 
  </Navbar>
    </header>
    );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
