import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='py-5'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
