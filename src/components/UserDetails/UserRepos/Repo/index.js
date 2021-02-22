import React from "react";
import classes from "./index.module.css";
import repo_icon from "../../../../Assets/Icons/repo_icon.svg";
import send from "../../../../Assets/Icons/send.svg";

const Repo = ({ repo }) => {
  return (
    <div className={classes.Repo}>
      <div className={classes.Header}>
        <img src={repo_icon} alt="repo icon" />
        <span className={classes.Name}>{repo.name}</span>
        <div className={classes.Expand}></div>
        <a href={repo.html_url} target="_blank" rel="noreferrer noopener">
          <img src={send} alt="send icon" />
        </a>
      </div>
    </div>
  );
};

export default Repo;
