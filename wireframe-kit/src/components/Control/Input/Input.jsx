import React from "react";
import "../../../style/style.css";
import { TextBlock } from "../../Primitive/TextBlock/TextBlock";

import Search from "../../../assets/icon/Search.svg";
import DownPath from "../../../assets/icon/DownPath.svg";
import Square from "../../../assets/icon/Square.svg";
import Circle from "../../../assets/icon/Circle.svg";

export const Input = ({}) => {
  return (
    <>
      <div className="input">
        <TextBlock size="Medium" color="Primary-Dark" />
      </div>
      {/* blank */}
      <div className="input"></div>

      {/* dropDown */}
      <div className="input input-pos">
        <TextBlock size="Medium" color="Primary-Dark" />
        <div>
          <img src={DownPath} />
        </div>
      </div>

      {/* searchBox */}
      <div className="input">
        <div>
          <img src={Search} />
        </div>
        <TextBlock size="Medium" color="Primary-Dark" />
      </div>

      {/* IconTextIcon */}
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
    </>
  );
};

Input.propTypes = {};

Input.defaultProps = {};
