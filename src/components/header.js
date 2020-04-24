import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Nav from './Nav';
import styled, {createGlobalStyle } from "styled-components";
const StyledLink = styled(Link)`
  display:inline-block;
  padding:12px 16px;
  color: palevioletred;
  font-weight: bold;
  text-decoration:none;
  &.active {
    color: black;
    
  }
`;


const GlobalStyle = createGlobalStyle`
  body {
    margin:0;
    font-family:'Merriweather', serif;
  }
`

const Container = styled.div`
  width:960px;
  margin:auto;    
`

const Header = ({ siteTitle }) => (
  <header>
    <GlobalStyle />
      <Nav>
      <Container>
      <StyledLink to="/" activeClassName="active">
          {siteTitle}
        </StyledLink>
        <StyledLink to="/about" activeClassName="active">
          Об авторе
        </StyledLink>
      </Container>
    </Nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
