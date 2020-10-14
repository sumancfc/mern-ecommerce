import React, { useState } from "react";
import Products from "../common/Products";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get("/apo/products");

      setProducts(response.data);
    };

    fetchAllProducts();
  }, []);

  return (
    <Layout>
      <div>
        <h2>Latest Products</h2>

        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Home;
