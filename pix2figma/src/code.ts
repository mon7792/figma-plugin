import { readDSL } from "./pix/pix";


// shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.


figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'export') {
    const nodes: SceneNode[] = [];

    // ADD CODE HERE.
    const screen = readDSL()
    // 
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



// header {
//   btn-inactive, btn-inactive, btn-inactive, btn-active, btn-inactive
//   }
//   row {
//   single {
//   small-title, text, btn-red
//   }
//   }


// function screenAndButton(){
//       // 
//       const startBtnComponent = figma.root.findOne(
//         (node) => node.type === "COMPONENT_SET" && node.name == "Button"
//       ) as ComponentSetNode;
  
//       console.log(startBtnComponent.children[0].name)
//       const starButton = startBtnComponent.findOne((node) => node.name === "Type=Circle Icon, Fill=False, Dark=True") as ComponentNode
  
//       const strBtn = starButton.createInstance()
//       // const defaultVariant = startBtnComponent.defaultVariant as ComponentNode;
  
  
//       // add the blank frame
//       const blankScreenFrame = figma.root.findOne(
//         (node) => node.type === "FRAME" && node.name == "Blank Screen"
//       ) as FrameNode;
  
//       blankScreenFrame.appendChild(strBtn)
//       blankScreenFrame.clone();
  
// }
  

    // for (let i = 0; i < 5; i++) {

    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }


// function header(){
//   const startBtnComponent = figma.root.findOne(
//     (node) => node.type === "COMPONENT_SET" && node.name == "Button"
//   ) as ComponentSetNode;

//   const starButton = startBtnComponent.findOne((node) => node.name === "Type=Circle Icon, Fill=False, Dark=True") as ComponentNode
//   // const strBtn = starButton.createInstance()

//   //  create a frame node
//   const rowFrame = figma.createFrame();
//   rowFrame.name = "rwo-single"

//   // structure: resize to entire desktop width.
//   rowFrame.resize(1280, 832)

//   // add the layout
//   rowFrame.layoutPositioning = "AUTO"
//   rowFrame.layoutMode = "VERTICAL"

//   // Space between children
//   rowFrame.horizontalPadding = 10
//   rowFrame.verticalPadding = 10

//   rowFrame.itemSpacing = 50

//   rowFrame.fills = [{type: 'SOLID', color: {r: 0, g: 0.49, b: 0.77}}];
//   // 00314D


//   // children
//   rowFrame.appendChild(starButton.createInstance())
//   rowFrame.appendChild(starButton.createInstance())


//   // figma.currentPage.appendChild(rowFrame);
//   // nodes.push(rowFrame);
// }