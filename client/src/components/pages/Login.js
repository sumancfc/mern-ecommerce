import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../common/FormContainer";
import Layout from "../Layout/Layout";
import { loginUser } from "../../actions/userAction";
import Message from "../common/Message";
import Loader from "../common/Loader";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const LoginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <Layout>
      <FormContainer>
        <h2>Login Here</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={LoginHandler}>
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
          <Button type='submit' variant='primary'>
            Login
          </Button>
        </Form>

        <p>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </p>
      </FormContainer>
    </Layout>
  );
};

export default Login;
