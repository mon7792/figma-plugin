import React from "react";
import PropTypes from "prop-types";

import "../../../style/style.css";

import Plus from "../../../assets/icon/Plus.svg";
import Minus from "../../../assets/icon/Minus.svg";

export const Stepper = ({ instance }) => {
  if (instance === "Square" || instance === "Circle") {
    let className =
      instance === "Square"
        ? "stepper-item stepper-item-outline stepper-item-square"
        : "stepper-item stepper-item-outline stepper-item-circle";
        
    return (
      <>
        <div className="stepper">
          <div className={className}>
            <img className="stepper-item-sign" src={Plus} />
          </div>
          <div className="stepper-item stepper-item-number">2</div>
          <div className={className}>
            <img className="stepper-item-sign" src={Minus} />
          </div>
        </div>
      </>
    );
  }

  if (instance === "Horizontal") {
    return (
      <>
        <div className="stepper">
          <div className="stepper-item stepper-item-outline stepper-item-horizontal-left">
            <img className="stepper-item-sign" src={Plus} />
          </div>
          <div className="stepper-item stepper-item-outline stepper-item-horizontal-right">
            <img className="stepper-item-sign" src={Minus} />
          </div>
        </div>
      </>
    );
  }

// Vertical 
  return (
    <>
      <div className="stepper-vertical">
        <div className="stepper-item stepper-item-outline stepper-item-vertical-top">
          <img className="stepper-item-sign" src={Plus} />
        </div>
        <div className="stepper-item stepper-item-outline stepper-item-vertical-bottom">
          <img className="stepper-item-sign" src={Minus} />
        </div>
      </div>
    </>
  );
};

Stepper.propTypes = {
  instance: PropTypes.oneOf(["Square", "Circle", "Horizontal", "Vertical"]),
};
Stepper.defaultProps = {
  instance: "Square",
};
