import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/product/:id' exact component={Product} />
        <Route path='/cart/:id?' component={Cart} />
      </Switch>
    </Router>
  );
}

export default App;
