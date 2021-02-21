import classes from "./index.module.css";
import React from "react";
import UserDetails from "../UserDetails";

const Search = () => {
  return (
    <div>
      <input
        type="text"
        className={classes.Input}
        placeholder="enter github username"
      />
      <button>Search</button>
      <UserDetails />
    </div>
  );
};

export default Search;
