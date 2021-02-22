import React from "react";
import classes from "./index.module.css";
import Repo from "./Repo";

const UserRepos = ({ userRepos }) => {
  // console.log(userRepos);
  return (
    <>
      <p className={classes.Heading}>Your Repositories</p>
      <div className={classes.UserRepos}>
        {userRepos.map((repo) => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  );
};

export default UserRepos;
