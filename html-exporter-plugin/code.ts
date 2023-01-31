// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // HTML 
    // const nd: SceneNode = figma.currentPage.selection[0]

    console.log(figma.currentPage.selection[0])

    // const ndInst: RectangleNode = figma.currentPage.selection[0] as RectangleNode

    // console.log(ndInst)
    // console.log(ndInst.fills)
    // ndInst.fills = [{type: 'SOLID', color: {r: 0, g: 0.5, b: 1}}];
    






  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'export-component') {
    const nodes: SceneNode[] = [];
    // for (let i = 0; i < 5; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};



// 1. Select the component.
// 2. Clone the component.
// 3. check the type.
