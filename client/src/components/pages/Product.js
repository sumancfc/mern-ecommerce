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
import { productDetails, reviewProduct } from "../../actions/productAction";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { PRODUCT_REVIEW_RESET } from "../../constant/productConstant";

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetailsR = useSelector((state) => state.productDetailsR);
  const { error, loading, product } = productDetailsR;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.productReview);
  const { error: errorReview, success } = productReview;

  useEffect(() => {
    if (success) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }

    dispatch(productDetails(match.params.id));
  }, [dispatch, match, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      reviewProduct(match.params.id, {
        rating,
        comment,
      })
    );
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
        <>
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

          <Row>
            <Col md={6} sm={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default Product;
