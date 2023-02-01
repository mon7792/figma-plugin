import React from "react";
import PropTypes from "prop-types";
import "../../../style/style.css";

import Picture from "../../../assets/icon/Picture.svg";
import User from "../../../assets/icon/User.svg";
import File from "../../../assets/icon/File.svg";
import Folder from "../../../assets/icon/Folder.svg";
import Map from "../../../assets/icon/Map.svg";
import Play from "../../../assets/icon/Play.svg";
import Tag from "../../../assets/icon/Tag.svg";
import Music from "../../../assets/icon/Music.svg";
import Process from "../../../assets/icon/Process.svg";

/**
 * Primary UI component for user interaction
 */
export const Placeholder = ({ instance }) => {
  let imgSrc;
  switch (instance) {
    case "Picture":
      imgSrc = Picture;
      break;
    case "User":
      imgSrc = User;
      break;
    case "File":
      imgSrc = File;
      break;
    case "Folder":
      imgSrc = Folder;
      break;
    case "Map":
      imgSrc = Map;
      break;
    case "Play":
      imgSrc = Play;
      break;
    case "Tag":
      imgSrc = Tag;
      break;
    case "Music":
      imgSrc = Music;
      break;
    default:
      imgSrc = Process;
      break;
  }
  return <img src={imgSrc} />;
};

Placeholder.propTypes = {
  instance: PropTypes.oneOf([
    "Picture",
    "User",
    "File",
    "Folder",
    "Map",
    "Play",
    "Tag",
    "Music",
    "Process",
  ]),
};

Placeholder.defaultProps = {
  instance: "Picture",
};
