import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "./Routes/Home";
import Header from "./Components/Header"
import TV from "./Routes/TV";
import Search from "./Routes/Search";
import Details from "./Routes/Details";

export default (themeToggler, currentTheme) => (
  <Router>
    <>
      <Header themeToggler ={themeToggler} currentTheme = {currentTheme}/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Details} />
        <Route path="/show/:id" component={Details} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
