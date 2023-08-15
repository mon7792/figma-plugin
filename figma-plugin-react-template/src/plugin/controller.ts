figma.showUI(__html__, {width:400, height:600});

figma.ui.onmessage = (msg) => {
  console.log(`${msg} recevied, ${msg.type}`)
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }


  // Create a svg Node 
  if (msg.type === 'generate-svg') {

    // call to the backend with search terms.

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'generate-svg',
      message: `SVG Generation in progress: ${msg.searchValue}`,
    });
  }

  // generate-svg

  // figma.closePlugin();
};


// async function createSvg(src: string): Promise<RectangleNode> {
//   const svg = await figma.createNodeFromSvg(src);

//   const node = figma.createRectangle();

//   const { width, height } = await image.getSizeAsync();
//   node.resize(width, height);

//   // Render the image by filling the rectangle.
//   node.fills = [
//     {
//       type: "IMAGE",
//       imageHash: image.hash,
//       scaleMode: "FILL",
//     },
//   ];
//   return node;
// }