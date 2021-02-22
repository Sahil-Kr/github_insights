import React from "react";
import classes from "./index.module.css";
import flame from "../../../../Assets/Icons/flame.svg";
import repo_icon from "../../../../Assets/Icons/repo_icon.svg";

const Developer = ({ dev, index }) => {
  return (
    <div className={classes.Tile}>
      <div className={classes.NameTile}>
        <span>{index}</span>
        <img className={classes.Image} src={dev.avatar} alt="avatar image" />
        <div className={classes.NameSubTile}>
          <span>
            <b>{dev.name}</b>
          </span>
          <span>{dev.username}</span>
        </div>
      </div>
      <div className={classes.RepoTile}>
        <div>
          <img src={flame} alt="flame_icon" />
          &nbsp; POPULAR REPO
        </div>
        <div>
          <img src={repo_icon} alt="repo_icon" />
          &nbsp;
          <span>
            <b>{dev.repo?.name}</b>
          </span>
        </div>
        <span>{dev.repo?.description}</span>
      </div>
      <div className={classes.FollowTile}>
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Developer;
