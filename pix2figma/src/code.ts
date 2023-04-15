import { buildFigmaTree, readTESTDSL } from "./pix/dsl";
import { readDSL } from "./pix/pix";


// shows the HTML page in "ui.html".
figma.showUI(__html__);

// Resize the plugin screen
figma.ui.resize(500, 500);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.


figma.ui.onmessage = async (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'load') {
    console.log("dfafdasdfasdfasfd")
   await loadImageInUI()

   return
  }


  if (msg.type === 'export') {
    const nodes: SceneNode[] = [];

    console.log(msg.pixDSL)
    const resp = await fetch("http://127.0.0.1:8080/status/dSdm75pu");
    const data = await resp.json();
    console.log(data)
    const input = data.predicted || msg.pixDSL
    const ip = JSON.parse(input).predicted
    console.log(JSON.stringify(ip))
    // ADD CODE HERE.
    const screen = readTESTDSL(JSON.stringify(ip));
    
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


async function loadImageInUI(): Promise<void>{
  // extract image hash from selected node
    const selectedNodes = figma.currentPage.selection[0] as RectangleNode; 
    const imgNode = selectedNodes.fills as ImagePaint[];
    const hash = imgNode[0].imageHash

    if (hash === null) {
      // todo: show error message
      return
    }

    // get bytes from image hash
    const img = await figma.getImageByHash(hash)
    if (img === null) {
      // todo: show error message
      return
    }

    const imgBytes = await img.getBytesAsync()

    // set the src url for img tag with id "pix-img"
    figma.ui.postMessage({ type: 'load', data: imgBytes })
}

// load img from UnitArray8 into img tag html
function loadImg(imgData: Uint8Array): string {
  return URL.createObjectURL(new Blob([imgData]));
}
