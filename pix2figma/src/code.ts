import { buildFigmaTree, readTESTDSL } from "./pix/dsl";
import { readDSL } from "./pix/pix";


// shows the HTML page in "ui.html".
figma.showUI(__html__);

// Resize the plugin screen
figma.ui.resize(500, 500);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.


figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'export') {
    const nodes: SceneNode[] = [];

    console.log(msg.pixDSL)
    // ADD CODE HERE.
    const screen = readTESTDSL(msg.pixDSL)
    
    figma.currentPage.appendChild(screen);
    nodes.push(screen);

    // frame components.
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};