import React, { useState } from "react";
import classes from "./index.module.css";
import repo_icon from "../../../../Assets/Icons/repo_icon.svg";
import maximize from "../../../../Assets/Icons/maximize.svg";
import expand from "../../../../Assets/Icons/expand.svg";
import star from "../../../../Assets/Icons/star.svg";
import fork from "../../../../Assets/Icons/fork.svg";
import RepoDetails from "./RepoDetails";
import { UrlLauncher } from "../../../Utilities";

const Repo = ({ repo }) => {
  const [clicked, setClicked] = useState(false);

  const toggleRepoClickHandler = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <div className={classes.Repo}>
        <div className={classes.Header}>
          <img src={repo_icon} alt="repo icon" />
          <div className={classes.NameCont}>
            <span className={classes.Name}>{repo.name}</span>
            <div className={classes.Misc}>
              <UrlLauncher
                url={`${repo.html_url}/stargazers`}
                className={classes.Star}
              >
                <img src={star} alt="star_icon" />
                &nbsp;<span>{repo.stargazers_count}</span>
              </UrlLauncher>

              <UrlLauncher
                url={`${repo.html_url}/network/members`}
                className={classes.Fork}
              >
                <img src={fork} alt="fork_icon" />
                &nbsp;<span>{repo.forks}</span>
              </UrlLauncher>
            </div>
          </div>
          <div className={classes.Expand}></div>
          <div className={classes.Tools}>
            <UrlLauncher url={repo.html_url}>
              <img className={classes.Send} src={expand} alt="send icon" />
            </UrlLauncher>

            <img
              className={classes.Maximize}
              src={maximize}
              alt="send icon"
              onClick={toggleRepoClickHandler}
            />
          </div>
        </div>
      </div>
      {clicked ? (
        <RepoDetails clickHandler={toggleRepoClickHandler} repo={repo} />
      ) : (
        ""
      )}
    </>
  );
};

export default Repo;
