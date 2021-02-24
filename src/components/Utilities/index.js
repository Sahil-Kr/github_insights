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
