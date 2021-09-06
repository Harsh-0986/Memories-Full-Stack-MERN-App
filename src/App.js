import { Container } from "@material-ui/core";
import React from "react";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
