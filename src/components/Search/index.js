import classes from "./index.module.css";
import React, { useEffect, useState } from "react";
import UserDetails from "../UserDetails";
import search_icon from "../../Assets/Icons/search_icon.svg";
import not_found from "../../Assets/Images/not_found.png";

const Search = (props) => {
  const [username, setUsername] = useState("");
  // const [usernameProp, setUsernameProp] = useState("");
  // const [submit, setSubmit] = useState(false);

  const clickHandler = () => {
    // setSubmit(true);
    // setUsernameProp(username);
    console.log(username);
    props.history.push(`/search/${username}`);
  };

  const onChangeHandler = (e) => {
    // if (e.target.value == "") setSubmit(false);
    setUsername(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className={classes.Input}
        placeholder="github username"
        value={username}
        onChange={onChangeHandler}
      />{" "}
      <div className={classes.Icon} onClick={clickHandler}>
        <img src={search_icon} alt="search_icon" height="16px" width="16px" />
      </div>
      {/* {submit ? <UserDetails username={usernameProp} /> : ""} */}
      {/* <div>
        <img src={not_found} alt="not found" height="300px" />
      </div> */}
    </div>
  );
};

export default Search;
