import React from "react";
import classes from "./index.module.css";
import Repo from "./Repo";

const UserRepos = ({ userRepos, commitData }) => {
  // console.log(userRepos);
  return (
    <>
      <p className={classes.Heading}>Your Repositories</p>
      <div className={classes.UserRepos}>
        {userRepos.map((repo, index) => (
          <Repo key={repo.id} repo={repo} commitData={commitData[index]} />
        ))}
      </div>
    </>
  );
};

export default UserRepos;
