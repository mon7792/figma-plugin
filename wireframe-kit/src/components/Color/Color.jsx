import React from 'react';
import './color.css';

/**
 * Primary UI component for user interaction
 */
export const Color = ({ instance }) => {
  let className = `color-tile ${instance}`
  return (
    <div className={className}></div>
  );
};
