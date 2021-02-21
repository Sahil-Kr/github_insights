import classes from "./index.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <Link className={classes.Links} to="/">
        Search
      </Link>
      <div className={classes.Spacer}></div>
      <Link className={classes.Links} to="/Trending">
        Trending
      </Link>
    </div>
  );
};

export default Navigation;
