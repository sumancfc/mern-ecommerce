import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Shipping from "./components/pages/Shipping";
import Payment from "./components/pages/Payment";
import PlaceOrder from "./components/pages/PlaceOrder";
import Order from "./components/pages/Order";
import UserList from "./components/pages/UserList";
import EditUser from "./components/pages/EditUser";
import ProductList from "./components/pages/ProductList";
import ProductCreate from "./components/pages/ProductCreate";
import ProductEdit from "./components/pages/ProductEdit";
import OrderList from "./components/pages/OrderList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />}>
          <Route path=":keyword" element={<Home />} />
          <Route path=":keyword/page/:pageNumber" element={<Home />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
