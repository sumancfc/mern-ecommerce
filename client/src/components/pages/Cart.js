import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../common/Message";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import Layout from "../Layout/Layout";

const Cart = ({ match, location, history }) => {
  const productID = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, match, productID, qty]);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Layout>
      {cartItems.length === 0 ? (
        <h2>
          <Message variant='warning'>
            Your Shopping cart is empty. <Link to='/'>Go Back</Link>
          </Message>
        </h2>
      ) : (
        <Row>
          <Col md={8}>
            <h1>Shopping List</h1>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.name}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>$ {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant='info'
                        type='button'
                        onClick={() => removeItemFromCart(item.product)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h3>

                  <h4>
                    Total Price: ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h4>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    className='btn-block'
                    variant='danger'
                    onClick={checkOutHandler}
                  >
                    Check Out
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Cart;
