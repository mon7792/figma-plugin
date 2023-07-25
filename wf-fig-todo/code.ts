// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, {
    themeColors: true,
    width: 400,
    height: 600,
    /* other options */
  });

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = async (msg) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === "create-todo") {
      const nodes: SceneNode[] = [];
      // const textNode = figma.createText()
      // textNode.x = 150
      // textNode.fontSize = 130;
      // textNode.characters = msg.textbox;
      const textNode = await createTextNode(msg.textbox);

      figma.currentPage.appendChild(textNode);
      nodes.push(textNode);

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    if (msg.type === "drop-img") {
      console.log("drop image");
      const { dropPosition, windowSize, offset, itemSize, src } = msg;

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
      const rect = await createImage(src);

      // Resize the rectangle to be the same size as the item from the plugin window.
      // rect.resize(itemSize.width, itemSize.height);
      figma.currentPage.appendChild(rect);

      // The canvas position of the drop point can be calculated using the following:
      rect.x = bounds.x + xFromCanvas / zoom - offset.x;
      rect.y = bounds.y + yFromCanvas / zoom - offset.y;

      // Select the rectangle
      figma.currentPage.selection = [rect];
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.

    if (msg.type === "cancel") {
      figma.closePlugin();
    }
  };
}

// Runs this code if the plugin is run in FigJam
if (figma.editorType === "figjam") {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many shapes and connectors on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = (msg) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === "create-todo") {
      const numberOfShapes = msg.count;
      const nodes: SceneNode[] = [];
      for (let i = 0; i < numberOfShapes; i++) {
        const shape = figma.createShapeWithText();
        // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
        shape.shapeType = "ROUNDED_RECTANGLE";
        shape.x = i * (shape.width + 200);
        shape.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
        figma.currentPage.appendChild(shape);
        nodes.push(shape);
      }

      for (let i = 0; i < numberOfShapes - 1; i++) {
        const connector = figma.createConnector();
        connector.strokeWeight = 8;

        connector.connectorStart = {
          endpointNodeId: nodes[i].id,
          magnet: "AUTO",
        };

        connector.connectorEnd = {
          endpointNodeId: nodes[i + 1].id,
          magnet: "AUTO",
        };
      }

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
  };
}

async function createTextNode(txt: string): Promise<TextNode> {
  const text = figma.createText();

  // Move to (50, 50)
  text.x = 50;
  text.y = 50;

  // Load the font in the text node before setting the characters
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  text.characters = txt;

  // Set bigger font size and red color
  text.fontSize = 18;
  text.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
  return text;
}

async function name(charCount: number) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/avatar/${charCount}.jpeg`
  );
}

// (async () => {
//   const response = await fetch("https://httpbin.org/get?success=true");
//   const json = await response.json();

//   const textNode = figma.createText();
//   await figma.loadFontAsync(textNode.fontName as FontName);

//   // success=true!
//   textNode.characters = JSON.stringify(json.args, null, 2);

//   figma.closePlugin();
// })();


async function createImage(src: string): Promise<RectangleNode> {
  const image = await figma.createImageAsync(src);

  const node = figma.createRectangle()

  const { width, height } = await image.getSizeAsync()
  node.resize(width, height)

  // Render the image by filling the rectangle.
  node.fills = [
    {
      type: 'IMAGE',
      imageHash: image.hash,
      scaleMode: 'FILL'
    }
  ]
  return node;
}