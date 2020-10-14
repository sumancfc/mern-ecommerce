import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Store</Navbar.Brand>
          </LinkContainer>
          <Nav className='ml-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
