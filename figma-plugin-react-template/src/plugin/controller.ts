figma.showUI(__html__, {width:400, height:600});

figma.ui.onmessage = async (msg) => {
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

    // const nodes = [];

    // const fs = await createSvg("https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg")
    // nodes.push(fs);
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'generate-svg',
      message: `SVG Generation in progress: ${msg.searchValue}`,
    });
  }

  // drop-svg
  if (msg.type === "drop-svg") {
      const { dropPosition, windowSize, offset, itemSize, src, name } = msg;

      console.log(itemSize)
      // Getting the position and size of the visible area of the canvas.
      const bounds = figma.viewport.bounds;

      // Getting the zoom level
      const zoom = figma.viewport.zoom;

      // There are two states of the Figma interface: With or without the UI (toolbar + left and right panes)
      // The calculations would be slightly different, depending on whether the UI is shown.
      // So to determine if the UI is shown, we'll be comparing the bounds to the window's width.
      // Math.round is used here because sometimes bounds.width * zoom may return a floating point number very close but not exactly the window width.
      const hasUI = Math.round(bounds.width * zoom) !== windowSize.width;

      // Since the left pane is resizable, we need to get its width by subtracting the right pane and the canvas width from the window width.
      const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;

      // Getting the position of the cursor relative to the top-left corner of the canvas.
      const xFromCanvas = hasUI
        ? dropPosition.clientX - leftPaneWidth
        : dropPosition.clientX;
      const yFromCanvas = hasUI
        ? dropPosition.clientY - 40
        : dropPosition.clientY;

      // Create a rectangle
      const frameNode = await createSvg(src, name);

      // Resize the rectangle to be the same size as the item from the plugin window.
      // rect.resize(itemSize.width, itemSize.height);
      figma.currentPage.appendChild(frameNode);

      // The canvas position of the drop point can be calculated using the following:

      frameNode.x = (bounds.x + xFromCanvas / zoom - offset.x) || 0;
      frameNode.y = (bounds.y + yFromCanvas / zoom - offset.y) || 0;

      // Select the rectangle
      figma.currentPage.selection = [frameNode];
    }

  // figma.closePlugin();

  // user info
  if (msg.type === "save-user") {
    await figma.clientStorage.setAsync("user", msg.userInfo);
  }

  if (msg.type === "get-user") {
    const resp = await figma.clientStorage.getAsync("user");
    figma.ui.postMessage({
      type: 'save-user',
      message: resp,
    });
  }

  

};


async function createSvg(url: string, name: string): Promise<FrameNode> {
  const response =  await fetch(url)
  const svgCont =  await response.text()
  const svg = figma.createNodeFromSvg(svgCont);
  svg.name = name
  return svg;
}