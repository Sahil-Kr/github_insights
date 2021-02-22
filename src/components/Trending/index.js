import classes from "./index.module.css";
import React, { useEffect, useRef, useState } from "react";
import Developers from "./Developers";
import Repositories from "./Repositories";

const Trending = () => {
  const [isRepo, setIsRepo] = useState(true);

  const repoClickHandler = () => {
    setIsRepo(true);
  };

  const devClickHandler = () => {
    setIsRepo(false);
  };

  const focusStyle = {
    outline: "none",
    border: "1px solid transparent",
    backgroundColor: "#0366d6",
  };

  return (
    <>
      <p className={classes.SubHeading}>
        See what the GitHub community is most excited about today.
      </p>
      <div className={classes.Container}>
        <div className={classes.ToggleButtons}>
          <button
            className={classes.RepoButton}
            onClick={repoClickHandler}
            style={isRepo ? focusStyle : {}}
          >
            Repositories
          </button>
          <button
            className={classes.DevButton}
            onClick={devClickHandler}
            style={!isRepo ? focusStyle : {}}
          >
            Developers
          </button>
        </div>
        {isRepo ? <Repositories /> : <Developers />}{" "}
      </div>
    </>
  );
};

export default Trending;
