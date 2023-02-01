import React from 'react';
import '../../style/style.css';

import Picture from "../../assets/icon/Picture.svg"

/**
 * Primary UI component for user interaction
 */
export const ImageBox = ({}) => {
  return (
    <div className="image-box-tile color-shade-bloo-30-dark">
      <img className="image-box-icon" src={Picture} />
    </div>
  );
};
  