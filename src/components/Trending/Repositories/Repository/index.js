import classes from "./index.module.css";
import React from "react";
import star from "../../../../Assets/Icons/star.svg";
import fork from "../../../../Assets/Icons/fork.svg";
import { UrlLauncher } from "../../../Utilities";
import UserImage from "./UserImage";

const Repository = ({ repo }) => {
  return (
    <div className={classes.Tile}>
      <div className={classes.Header}>
        <img className={classes.Image} src={repo.avatar} alt="avatar image" />
        <div className={classes.SubHeader}>
          <UrlLauncher url={repo.url}>
            <span>
              {repo.author} / <b>{repo.name}</b>
            </span>
          </UrlLauncher>
          <div className={classes.Desc}>{repo.description}</div>
        </div>
      </div>
      <div className={classes.Misc}>
        <div
          className={classes.Lang}
          style={{ backgroundColor: `${repo.languageColor}` }}
        />
        &nbsp;
        <span>{repo.language}</span>
        <UrlLauncher url={`${repo.url}/stargazers`} className={classes.Star}>
          <img src={star} alt="star_icon" />
          &nbsp;<span>{repo.stars}</span>
        </UrlLauncher>
        <UrlLauncher
          url={`${repo.url}/network/members`}
          className={classes.Fork}
        >
          <img src={fork} alt="fork_icon" />
          &nbsp;<span>{repo.forks}</span>
        </UrlLauncher>
        <span style={{ marginLeft: "1rem" }}>Built by</span>&nbsp;
        {repo.builtBy.map((user, index) => (
          <UserImage
            key={("" + Math.random() * (index + 1)).split(".")[1]}
            avatar_url={user.avatar}
            url={user.href}
            username={user.username}
          />
        ))}
        <div className={classes.Expand}></div>
        <img className={classes.Star} src={star} alt="star_icon" />
        &nbsp;<span>{repo.currentPeriodStars} stars today</span>
      </div>
    </div>
  );
};

export default Repository;
