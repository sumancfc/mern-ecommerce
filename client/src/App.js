import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/product/:id' exact component={Product} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
