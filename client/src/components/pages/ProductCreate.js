import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import Message from "../common/Message";
import Loader from "../common/Loader";
import FormContainer from "../common/FormContainer";
import { createProduct } from "../../actions/productAction";
import { PRODUCT_CREATE_RESET } from "../../constant/productConstant";

const ProductCreate = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/admin/productlist");
    }

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
  }, [history, userInfo, dispatch, success]);

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(name, description, price, brand, category, countInStock)
    );
    // if (success) {
    //
    // }
  };

  return (
    <Layout>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go to Product List
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={createProductHandler}>
          <Form.Group controlId='name'>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Control
              as='textarea'
              rows='3'
              type='text'
              placeholder='Descripton'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Control
              type='number'
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Control
              type='text'
              placeholder='Brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Control
              type='text'
              placeholder='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Control
              type='number'
              placeholder='Count In Stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default ProductCreate;
