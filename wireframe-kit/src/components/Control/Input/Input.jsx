import React from "react";
import PropTypes from 'prop-types';
import "../../../style/style.css";
import { TextBlock } from "../../Primitive/TextBlock/TextBlock";

import Search from "../../../assets/icon/Search.svg";
import DownPath from "../../../assets/icon/DownPath.svg";
import Square from "../../../assets/icon/Square.svg";
import Circle from "../../../assets/icon/Circle.svg";

export const Input = ({ instance }) => {
  switch (instance) {
    case "TextBlock":
      return (
        <div className="input">
          <TextBlock size="Medium" color="Primary-Dark" />
        </div>
      );
    case "Blank":
      return <div className="input"></div>;
    case "Dropdown":
      return (
        <div className="input input-pos">
          <TextBlock size="Medium" color="Primary-Dark" />
          <div>
            <img src={DownPath} />
          </div>
        </div>
      );
    case "SearchBox":
      return (
        <div className="input">
          <div>
            <img src={Search} />
          </div>
          <TextBlock size="Medium" color="Primary-Dark" />
        </div>
      );
    default:
      return (
        <div className="input">
          <div>
            <img src={Circle} />
          </div>
          <div className="input-item input-pos">
            <TextBlock size="Medium" color="Primary-Dark" />
            <div>
              <img src={Square} />
            </div>
          </div>
        </div>
      );
  }
};

Input.propTypes = {
  instance: PropTypes.oneOf(['TextBlock', 'Blank', 'Dropdown','SearchBox', 'IconTextIcon']),
};

Input.defaultProps = {
  instance: "TextBlock"
};
