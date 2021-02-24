import React, { useState } from "react";
import classes from "./index.module.css";
import { UrlLauncher, HoverDialog } from "../../../../Utilities";

const UserImage = ({ url, avatar_url, username }) => {
  const [showDialog, setShowDialog] = useState(false);

  const mouseOverHandler = (e) => setShowDialog(true);

  const mouseOutHandler = () => setShowDialog(false);

  return (
    <UrlLauncher url={url}>
      <img
        className={classes.UserImage}
        src={avatar_url}
        alt="img"
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      />
      {showDialog ? <HoverDialog>{username}</HoverDialog> : ""}
    </UrlLauncher>
  );
};

export default UserImage;
