import React from 'react';
import '../../style/style.css';

import Bloo from "../../assets/icon/Bloo.svg"

export const Logo = ({}) => {
  return (
    <div className='logo-cont'>
        <div>
            <img className='logo-cont-icon' src={Bloo} />
        </div>
        <div className='logo-cont-title typography-bold'>bloo.</div>
    </div>
  )
}


Logo.propTypes = {};
  
Logo.defaultProps = {};