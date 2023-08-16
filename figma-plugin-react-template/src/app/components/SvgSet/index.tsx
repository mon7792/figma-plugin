import React, { FunctionComponent } from 'react';

type SvgSetProps = {
  images: Array<genSVG>;
};

// SvgSet Components
// TODO: make sure the image are scaled down keeping the aspect ratio.
const SvgSet: FunctionComponent<SvgSetProps> = ({images}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, i) => {
          return (
            <div key={i} className="flex justify-center">
              <img src={img.url} alt="img1" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SvgSet;
