import React, { FunctionComponent } from 'react';
import Svg from '../Svg';

type SvgSetProps = {
  images: Array<genSVG>;
};

// SvgSet Components
// TODO: make sure the image are scaled down keeping the aspect ratio.
const SvgSet: FunctionComponent<SvgSetProps> = ({ images }) => {

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, i) => {
          return (
            <Svg key={i} svg={img}/>
          );
        })}
      </div>
    </>
  );
};

export default SvgSet;
