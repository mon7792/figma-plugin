import React, { FunctionComponent } from 'react';

type SvgProps = {
  svg: genSVG;
};

// Svg Components
// TODO: make sure the image are scaled down keeping the aspect ratio.
const Svg: FunctionComponent<SvgProps> = ({ svg }) => {
  const onDragEnd = (e: any) => {
    // Don't proceed if the item was dropped inside the plugin window.
    if (e.view.length === 0) return;

    // Getting the position of the cursor relative to the top-left corner of the browser page (Where the hamburger icon is)
    const dropPosition = {
      clientX: e.clientX,
      clientY: e.clientY,
    };

    // Getting the size of the app/browser window.
    const windowSize = {
      width: window.outerWidth,
      height: window.outerHeight,
    };

    // These are the offsets set from the dragstart event.
    const offset = {
      x: 0,
      y: 0,
    };

    const itemSize = {
      width: e.target.clientWidth,
      height: e.target.clientHeight,
    };

    const src = e.target.src;
    const name = e.target.alt;
    // Sending the variables over to the main code.
    window.parent.postMessage(
      {
        pluginMessage: {
          type: 'drop-svg',
          dropPosition,
          windowSize,
          offset,
          itemSize,
          src,
          name,
        },
      },
      '*'
    );
  };

  return (
    <div className="flex justify-center">
      <img src={svg.url} alt={svg.name} onDragEnd={onDragEnd} />
    </div>
  );
};

export default Svg;
