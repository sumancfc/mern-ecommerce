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
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
