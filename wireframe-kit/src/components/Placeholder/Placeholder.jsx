import React from 'react';
import PropTypes from 'prop-types';
import '../../style/style.css';

import Picture from "../../assets/icon/Picture.svg"

/**
 * Primary UI component for user interaction
 */
export const Placeholder = ({}) => {
  let className = `sr`
  return (
    <div className={className}>
        <img src={Picture} />
    </div>
  );
};


Placeholder.propTypes = {};
  
Placeholder.defaultProps = {};
  