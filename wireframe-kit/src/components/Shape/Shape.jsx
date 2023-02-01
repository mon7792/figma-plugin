import React from "react";
import PropTypes from "prop-types";
import "../../style/style.css";

/**
 * Primary UI component for user interaction
 */
export const Shape = ({ instance }) => {
  let className = ``;
  switch (instance) {
    case "Square":
      className = "shape-square";
      break;
    case "Circle":
      className = "shape-circle";
      break;
    default:
      className = "shape-triangle";
      break;
  }

  return <div className={className}></div>;
};

Shape.propTypes = {
  instance: PropTypes.oneOf(["Square", "Circle", "Triangle"]),
};

Shape.defaultProps = {
  instance: "Square",
};
