import React, { FunctionComponent } from 'react';

//
type SvgSetProps = {
  images?: Array<string>;
};

// TODO: genImages will come from the api call
const genImages: Array<string> = [
  'https://fakeimg.pl/128x128',
  'https://fakeimg.pl/128x128',
  'https://fakeimg.pl/128x128',
  'https://fakeimg.pl/128x128',
];

// ImageSet Components
const SvgSet: FunctionComponent<SvgSetProps> = ({}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {genImages.map((imgURL, i) => {
          return (
            <div key={i} className="flex justify-center">
              <img src={imgURL} alt="img1" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SvgSet;
