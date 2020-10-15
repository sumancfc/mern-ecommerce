import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Ratings from "../common/Ratings";
import Layout from "../Layout/Layout";
import { productDetails } from "../../actions/productAction";
import Loader from "../common/Loader";
import Message from "../common/Message";

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetailsR = useSelector((state) => state.productDetailsR);

  const { error, loading, product } = productDetailsR;

  useEffect(() => {
    dispatch(productDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <Layout>
      <Row>
        <div className='d-flex'>
          <Link to='/'>
            <span>Home </span>
          </Link>{" "}
          / {product.name}
        </div>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='mt-5'>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup>
              <ListGroupItem>{product.name}</ListGroupItem>
              <ListGroupItem>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} ratings`}
                />
              </ListGroupItem>
              <ListGroupItem>$ {product.price}</ListGroupItem>
              <ListGroupItem>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </ListGroupItem>
              <ListGroupItem>{product.description}</ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  variant='primary'
                  className='mt-5'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Product;
