import React from "react";
import Navigation from "../components/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Search from "../components/Search";
import Trending from "../components/Trending";

const Layout = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/search" exact component={Search} />
          <Route path="/trending" component={Trending} />
          <Redirect exact from="/" to="trending" />
        </Switch>
      </Router>
    </>
  );
};

export default Layout;
