import React from "react";
import classes from "./index.module.css";

export const UrlLauncher = (props) => {
  return (
    <a
      className={props.className}
      href={props.url}
      target="_blank"
      rel="noreferrer noopener"
    >
      {props.children}
    </a>
  );
};

export const HoverDialog = (props) => {
  const style = {
    top: `${props.y}px`,
    left: `${props.x}px`,
  };
  return (
    <div className={classes.HoverDialog} style={style}>
      {props.children}
    </div>
  );
};

export const getDuration = (date) => {
  const diff = new Date().getTime() - new Date(date).getTime();

  const inSec = Math.ceil(diff / 1000);
  if (inSec < 60) {
    if (inSec === 1) return `1 second`;
    return `${inSec} seconds`;
  } else if (inSec / 60 < 60) {
    if (Math.ceil(inSec / 60) === 1) return `1 minute`;
    return `${Math.ceil(inSec / 60)} minutes`;
  } else if (inSec / 3600 < 24) {
    if (Math.ceil(inSec / 3600) === 1) return `1 hour`;
    return `${Math.ceil(inSec / 3600)} hours`;
  } else if (inSec / (3600 * 24) < 31) {
    if (Math.ceil(inSec / (3600 * 24)) === 1) return `1 day`;
    return `${Math.ceil(inSec / (3600 * 24))} days`;
  } else if (inSec / (3600 * 24 * 30) < 12) {
    if (Math.ceil(inSec / (3600 * 24 * 30)) === 1) return `1 month`;
    return `${Math.ceil(inSec / (3600 * 24 * 30))} months`;
  } else if (Math.ceil(inSec / (3600 * 24 * 30 * 12)) === 1) return `1 year`;
  else return `${Math.ceil(inSec / (3600 * 24 * 30 * 12))} years`;
};
