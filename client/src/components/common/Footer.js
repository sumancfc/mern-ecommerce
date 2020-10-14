import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className='py-3'>
      <Container>
        <div className='text-center'>
          &copy; Copyright {new Date().getFullYear()}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
