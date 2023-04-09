// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

function createScreenNode(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "pix2fig-screen";
  componentNode.blendMode = "PASS_THROUGH";

  const rct: Rect = {
    x: 7425.0,
    y: 14361.0,
    width: 1280.0,
    height: 832.0,
  };
  componentNode.resize(rct.width, rct.height);

  componentNode.clipsContent = true;
  const bg: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.00095486640930175781,
      g: 0.14701038599014282,
      b: 0.2291666716337204,
    },
  };
  componentNode.backgrounds = [bg];
  componentNode.fills = [bg];

  const st: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.012499988079071045,
      g: 0.64449983835220337,
      b: 1.0,
    },
  };
  componentNode.strokes = [st];
  componentNode.cornerRadius = 40;
  componentNode.strokeWeight = 2;
  componentNode.strokeAlign = "INSIDE";

  // TODO CHANGE THIS: THIS MIGHT NOT BE REQUIRED.
  // componentNode.fillStyleId = "201:3921";
  // componentNode.strokeStyleId = "339:3695";
  // componentNode.effectStyleId = "273:6795";

  componentNode.effects = [
    {
      type: "DROP_SHADOW",
      visible: true,
      color: {
        r: 0.011764706112444401,
        g: 0.64313727617263794,
        b: 1.0,
        a: 1.0,
      },
      blendMode: "NORMAL",
      offset: {
        x: 0.0,
        y: 8.0,
      },
      radius: 0.0,
      showShadowBehindNode: true,
    },
  ];
  return componentNode;
}

// RUN THE FIGMA PLUGIN.
async function main() {
  const nodes: SceneNode[] = [];
  const nd = createScreenNode();
  nodes.push(nd);
  // Pushed the created nodes here.
  // nodes.push(await getCreateNodes());

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
}

main();
