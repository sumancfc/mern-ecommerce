import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../common/Products";
import Layout from "../Layout/Layout";
import { Alert, Col, Row } from "react-bootstrap";
import { productList } from "../../actions/productAction";
import Loader from "../common/Loader";
import Paginate from "../common/Paginate";
import { useParams } from "react-router-dom";

const Home = () => {
  const { keyword, pageNumber = 1 } = useParams();

  const dispatch = useDispatch();

  const productListR = useSelector((state) => state.productListR);
  const { error, loading, products, page, pages } = productListR;

  useEffect(() => {
    dispatch(productList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Layout>
      <div>
        <h2>Latest Products</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Products product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
