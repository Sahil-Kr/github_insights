import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { UrlLauncher, getDuration } from "../../Utilities";
import classes from "./index.module.css";

const UserInfo = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = async () => {
    console.log("fetching data");
    try {
      const data = await fetch(`https://api.github.com/users/${username}`).then(
        (res) => {
          const resJson = res.json();
          if (!res.ok || res.status != 200) {
            throw resJson;
          }

          return resJson;
        }
      );
      //   console.log(data);
      setUserData(data);
    } catch (e) {
      // e.then((res) => {
      //   console.log("error", res.message);
      //   setError(res.message);
      // });
      console.log("error", e);
      setError(e + "");
    }
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        <div className={classes.UserImageInfo}>
          <img src={userData.avatar_url} className={classes.UserImage} />
          <div className={classes.UserInfo}>
            <p>
              {userData.login}({userData.name})
            </p>
            <p>{userData.public_repos} public repo</p>
            <p>Joined Github {getDuration(userData.created_at)} ago</p>
            <p>{userData.company}</p>
            <UrlLauncher url={userData.html_url} className={classes.Link}>
              <span>View profile on Github</span>
            </UrlLauncher>

            {/* <p>{userData.bio}</p> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserInfo;
