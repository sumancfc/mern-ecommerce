import React from "react";
import { Col, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Row className='justify-content-md-center'>
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  );
};

export default FormContainer;
