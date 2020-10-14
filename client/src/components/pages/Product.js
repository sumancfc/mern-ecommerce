import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Ratings from "../common/Ratings";
import Layout from "../Layout/Layout";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${match.params.id}`);

      setProduct(response.data);
    };
    fetchProduct();
  }, []);

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
          </ListGroup>
          <Button
            variant='primary'
            className='mt-5'
            disabled={product.countInStock === 0}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default Product;
