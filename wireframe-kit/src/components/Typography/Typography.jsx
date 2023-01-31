import React from "react";
import PropTypes from "prop-types";
import "../../style/style.css";

/**
 * Primary UI component for user interaction
 */
export const Typography = ({ type }) => {
  let className = ``;
  switch (type) {
    case "Bold":
      className = "typography-bold";
      break;
    case "Semi-Bold":
      className = "typography-semi-bold";
      break;
    default:
      className = "typography-medium";
      break;
  }
  className = `${className} color-shade-native-dark-font`
  return <div className={className}>AaBbCcDdEeGgNn 1234567890</div>;
};

Typography.propTypes = {
  type: PropTypes.oneOf(["Bold", "Semi-Bold", "Medium"]),
};

Typography.defaultProps = {
  type: "Bold",
};
