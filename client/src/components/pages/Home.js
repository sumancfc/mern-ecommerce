import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../common/Products";
import Layout from "../Layout/Layout";
import { Alert, Col, Row } from "react-bootstrap";
import { productList } from "../../actions/productAction";
import Loader from "../common/Loader";

const Home = ({ match }) => {
  const keyword = match.params.keyword;

  // const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const productListR = useSelector((state) => state.productListR);
  const { error, loading, products } = productListR;

  useEffect(() => {
    dispatch(productList(keyword));
  }, [dispatch, keyword]);

  return (
    <Layout>
      <div>
        <h2>Latest Products</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default Home;
