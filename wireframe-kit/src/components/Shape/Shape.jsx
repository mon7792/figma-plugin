import React from 'react';
import '../../style/style.css';

/**
 * Primary UI component for user interaction
 */
export const Shape = ({ instance }) => {
  return (
    <>
    <div className="shape-square"></div>
    <div className="shape-circle"></div>
    <div className="shape-triangle"></div>
    </>
    
  );
};


Shape.propTypes = {};
  
Shape.defaultProps = {};
  