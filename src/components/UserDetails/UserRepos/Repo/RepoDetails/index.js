import classes from "./index.module.css";
import React, { useEffect, useState } from "react";

const RepoDetails = ({ repo, clickHandler }) => {
  const [commitData, setcommitData] = useState([]);
  useEffect(() => {
    //  fetchCommitData();
  }, []);

  const fetchCommitData = async () => {
    const data = await fetch("").then((res) => res.json());
  };
  return (
    <>
      <div className={classes.Modal} onClick={clickHandler}></div>
      <div className={classes.RepoDetails}>Repo Details</div>
    </>
  );
};

export default RepoDetails;
