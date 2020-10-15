import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../common/FormContainer";
import Layout from "../Layout/Layout";
import { registerUser } from "../../actions/userAction";
import Message from "../common/Message";
import Loader from "../common/Loader";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password not matched");
    } else {
      dispatch(registerUser(name, email, password));
    }
  };

  return (
    <Layout>
      <FormContainer>
        <h2>Signup</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={registerHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Enter Email Address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter Email Address'
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Enter Password '
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={confirmPassword}
              placeholder='Confirm Password '
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>

        <p>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </p>
      </FormContainer>
    </Layout>
  );
};

export default Register;
