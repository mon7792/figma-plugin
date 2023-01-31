import React from 'react';
import PropTypes from 'prop-types';
import '../../style/style.css';

/**
 * Primary UI component for user interaction
 */
export const TextBlock = ({ size, color }) => {

let sizeClassName = "" 
switch(size){
    case "Small":
        sizeClassName = "text-block-small"
        break;
    case "Medium":
        sizeClassName = "text-block-medium"
        break;
    default:
        sizeClassName = "text-block-large"
        break;
}

let colorClassName = "" 
switch(color){
    case "Native-Dark":
        colorClassName = "color-shade-native-dark"
        break;
    case "Bloo-30-Dark":
        colorClassName = "color-shade-bloo-30-dark"
        break;
    case "Bloo-20-Dark":
        colorClassName = "color-shade-bloo-20-dark"
        break;
    case "Bloo-10-Dark":
        colorClassName = "color-shade-bloo-10-dark"
        break;
    default:
        colorClassName = "color-shade-primary-dark"
        break;
}

  let className = `${sizeClassName} ${colorClassName}`
  return (
    <div className={className}></div>
  );
};


TextBlock.propTypes = {
    /**
     * Is this the principal call to action on the page?
     */
    size: PropTypes.oneOf(['Small', 'Medium', 'Large']),
    /**
     * What background color to use
     */
    color: PropTypes.oneOf(['Native-Dark', 'Bloo-30-Dark', 'Bloo-20-Dark','Bloo-10-Dark', 'Primary-Dark']),
  };
  
  TextBlock.defaultProps = {
    size: 'Small',
    color: 'Native-Dark'
  };
  