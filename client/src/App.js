import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route path='/order/:id' component={Order} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/product/:id' exact component={Product} />

        <Route path='/cart/:id?' component={Cart} />
        <Route path='/admin/userlist' component={UserList} />
        <Route path='/admin/user/:id/edit' component={EditUser} />
        <Route path='/admin/productlist' exact component={ProductList} />
        <Route path='/admin/product/:id/edit' exact component={ProductEdit} />
        <Route path='/admin/createproduct' exact component={ProductCreate} />
        <Route path='/admin/orderlist' exact component={OrderList} />
        <Route path='/search/:keyword' component={Home} exact />
        <Route path='/page/:pageNumber' component={Home} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={Home}
          exact
        />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
