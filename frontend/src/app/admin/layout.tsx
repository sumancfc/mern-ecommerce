"use client";

import { Container, Row, Col, Nav } from "react-bootstrap";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className='bg-light sidebar'>
          <Nav className='flex-column'>
            <Nav.Link href='/admin/dashboard'>Dashboard</Nav.Link>
            <Nav.Link href='/admin/users'>Users</Nav.Link>
            <Nav.Link href='/admin/products'>Products</Nav.Link>
            <Nav.Link href='/admin/orders'>Orders</Nav.Link>
          </Nav>
        </Col>
        {children}
      </Row>
    </Container>
  );
};

export default AdminLayout;
