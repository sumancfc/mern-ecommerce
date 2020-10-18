import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import FormContainer from "../common/FormContainer";
import CheckoutSteps from "../common/CheckoutSteps";
import Layout from "../Layout/Layout";
import { savePaymentMethod } from "../../actions/cartAction";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const paymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 stem3 />
        <h1>Payment Method</h1>
        <Form onSubmit={paymentHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='Payal'
                name='paymentMethod'
                value='Paypal'
                defaultChecked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Cash on Delivery'
                id='COD'
                name='paymentMethod'
                value='Cash on Delivery'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='secondary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default Payment;
