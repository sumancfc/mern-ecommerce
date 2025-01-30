"use client";

import { Row, Col, Card } from "react-bootstrap";

const AdminDashboard: React.FC = () => {
  return (
    <Col md={9}>
      <h1 className='mt-4 mb-4'>Admin Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,234</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>567</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>890</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default AdminDashboard;
