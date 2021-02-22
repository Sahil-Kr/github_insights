import classes from "./index.module.css";
import React from "react";
import star from "../../../../Assets/Icons/star.svg";
import fork from "../../../../Assets/Icons/fork.svg";

const Repository = ({ repo }) => {
  return (
    <div className={classes.Tile}>
      <div className={classes.Header}>
        <img className={classes.Image} src={repo.avatar} alt="avatar image" />
        <div className={classes.SubHeader}>
          <span>
            {repo.author} / <b>{repo.name}</b>
          </span>
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
        <img className={classes.Star} src={star} alt="star_icon" />
        &nbsp;<span>{repo.stars}</span>
        <img className={classes.Fork} src={fork} alt="fork_icon" />
        &nbsp;<span>{repo.forks}</span>
        <span style={{ marginLeft: "1rem" }}>Built by</span>&nbsp;
        {repo.builtBy.map((user, index) => (
          <UserImage
            key={("" + Math.random() * (index + 1)).split(".")[1]}
            url={user.avatar}
          />
        ))}
        <div className={classes.Expand}></div>
        <img className={classes.Star} src={star} alt="star_icon" />
        &nbsp;<span>{repo.currentPeriodStars} stars today</span>
      </div>
    </div>
  );
};

const UserImage = ({ url }) => (
  <img className={classes.UserImage} src={url} alt="img" />
);

export default Repository;
