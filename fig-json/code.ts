// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

function createScreenNode(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "pix2fig-screen";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(1280, 832);
  componentNode.x = 0;
  componentNode.y = 200;

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

// TODO: CHANGE THIS TO CREATE A BUTTON NODE.
function createButtonNode(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "pix2fig-button";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(157, 52);
  componentNode.x = 0;
  componentNode.y = 80;

  componentNode.clipsContent = false;
  const bg: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.0,
      g: 0.19199997186660767,
      b: 0.30000001192092896,
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
  componentNode.cornerRadius = 16;
  componentNode.strokeWeight = 2;
  componentNode.strokeAlign = "INSIDE";

  componentNode.layoutMode = "HORIZONTAL";
  componentNode.itemSpacing = 10.0;
  componentNode.primaryAxisSizingMode = "FIXED";
  componentNode.counterAxisAlignItems = "CENTER";
  componentNode.primaryAxisAlignItems = "SPACE_BETWEEN";
  componentNode.paddingLeft = 24.0;
  componentNode.paddingRight = 24.0;
  componentNode.paddingTop = 24.0;
  componentNode.paddingBottom = 20.0;

  // childrens
  // 1
  const comp = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, Default, Dark=True"
  ) as ComponentNode;
  const inst = comp.createInstance();
  inst.name = "Text Block";
  inst.resize(72, 12);
  inst.clipsContent = false;
  // inst.constraints = {
  //   horizontal: "FIXED",
  //   vertical: "FIXED",
  // };
  inst.layoutAlign = "INHERIT";
  inst.layoutGrow = 0;
  inst.backgrounds = [];
  inst.fills = [];
  inst.strokes = [];
  inst.strokeWeight = 1;
  inst.strokeAlign = "INSIDE";
  inst.effects = [];

  componentNode.appendChild(inst);

  return componentNode;
}

// createSmallTitleV1 is a function that creates a small title component. V1
// Medium, Default, Dark=True
// x:0
function createSmallTitleV1(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "Medium, Default, Dark=True";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(120, 12);
  componentNode.x = 0;
  componentNode.y = 0;

  componentNode.clipsContent = false;
  const bg: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.0,
      g: 0.0,
      b: 0.0,
    },
  };
  componentNode.backgrounds = [bg];
  componentNode.fills = [];
  componentNode.strokes = [];
  componentNode.strokeWeight = 1;
  componentNode.strokeAlign = "INSIDE";

  componentNode.effects = [];

  // childrens
  const rectNode = figma.createRectangle();
  rectNode.name = "Shape";
  rectNode.blendMode = "PASS_THROUGH";
  rectNode.resize(120, 12);
  rectNode.constraints = {
    horizontal: "SCALE",
    vertical: "SCALE",
  };
  const flr: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.012499988079071045,
      g: 0.64449983835220337,
      b: 1.0,
    },
  };
  rectNode.fills = [flr];
  rectNode.strokes = [];
  rectNode.cornerRadius = 6;
  rectNode.strokeWeight = 1;
  rectNode.strokeAlign = "INSIDE";
  rectNode.effects = [];

  componentNode.insertChild(0, rectNode);

  return componentNode;
}

// createSmallTitleV2 is a function that creates a small title component. V2
// Medium, 100, Dark=True
// x:150
function createSmallTitleV2(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "Medium, 100, Dark=True";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(120, 12);
  componentNode.x = 150;
  componentNode.y = 0;

  componentNode.clipsContent = false;
  const bg: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.0,
      g: 0.0,
      b: 0.0,
    },
  };
  componentNode.backgrounds = [bg];
  componentNode.fills = [];
  componentNode.strokes = [];
  componentNode.strokeWeight = 1;
  componentNode.strokeAlign = "INSIDE";

  componentNode.effects = [];

  // childrens
  const rectNode = figma.createRectangle();
  rectNode.name = "Shape";
  rectNode.blendMode = "PASS_THROUGH";
  rectNode.resize(120, 12);
  rectNode.constraints = {
    horizontal: "SCALE",
    vertical: "SCALE",
  };
  const flr: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.012499988079071045,
      g: 0.26745828986167908,
      b: 0.40833333134651184,
    },
  };
  rectNode.fills = [flr];
  rectNode.strokes = [];
  rectNode.cornerRadius = 6;
  rectNode.strokeWeight = 1;
  rectNode.strokeAlign = "INSIDE";
  rectNode.effects = [];

  componentNode.insertChild(0, rectNode);

  return componentNode;
}

// createSmallTitleV2 is a function that creates a small title component. V2
// Medium, 200, Dark=True
// x:300
function createSmallTitleV3(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "Medium, 200, Dark=True";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(120, 12);
  componentNode.x = 300;
  componentNode.y = 0;

  componentNode.clipsContent = false;
  const bg: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.0,
      g: 0.0,
      b: 0.0,
    },
  };
  componentNode.backgrounds = [bg];
  componentNode.fills = [];
  componentNode.strokes = [];
  componentNode.strokeWeight = 1;
  componentNode.strokeAlign = "INSIDE";

  componentNode.effects = [];

  // childrens
  const rectNode = figma.createRectangle();
  rectNode.name = "Shape";
  rectNode.blendMode = "PASS_THROUGH";
  rectNode.resize(120, 12);
  rectNode.constraints = {
    horizontal: "SCALE",
    vertical: "SCALE",
  };
  const flr: Paint = {
    blendMode: "NORMAL",
    type: "SOLID",
    color: {
      r: 0.0,
      g: 0.19199997186660767,
      b: 0.30000001192092896,
    },
  };
  rectNode.fills = [flr];
  rectNode.strokes = [];
  rectNode.cornerRadius = 6;
  rectNode.strokeWeight = 1;
  rectNode.strokeAlign = "INSIDE";
  rectNode.effects = [];

  componentNode.insertChild(0, rectNode);

  return componentNode;
}

// createTextBlock creates the Text Block Component
function createTextBlock(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "pix2fig-text";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(375, 150);
  componentNode.x = 0;
  componentNode.y = -222;
  componentNode.clipsContent = false;
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
  componentNode.strokes = [];

  componentNode.strokeWeight = 1;
  componentNode.strokeAlign = "INSIDE";

  componentNode.layoutMode = "VERTICAL";
  componentNode.counterAxisSizingMode = "FIXED";
  componentNode.itemSpacing = 16.0;
  componentNode.primaryAxisAlignItems = "CENTER";
  componentNode.paddingLeft = 24.0;
  componentNode.paddingRight = 24.0;
  componentNode.paddingTop = 24.0;
  componentNode.paddingBottom = 24.0;
  componentNode.effects = [];
  return componentNode;
}

// createTextBlock creates the Text Block Component
function createTextBlockV1(): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = "pix2fig-text";
  componentNode.blendMode = "PASS_THROUGH";

  componentNode.resize(375, 150);
  componentNode.x = 0;
  componentNode.y = -222;
  componentNode.clipsContent = false;
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
  componentNode.strokes = [];

  componentNode.strokeWeight = 1;
  componentNode.strokeAlign = "INSIDE";

  componentNode.layoutMode = "VERTICAL";
  componentNode.counterAxisSizingMode = "FIXED";
  componentNode.itemSpacing = 16.0;
  componentNode.primaryAxisAlignItems = "CENTER";
  componentNode.paddingLeft = 24.0;
  componentNode.paddingRight = 24.0;
  componentNode.paddingTop = 24.0;
  componentNode.paddingBottom = 24.0;
  componentNode.effects = [];

  // childrens
  // 1
  const comp = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, Default, Dark=True"
  ) as ComponentNode;
  const inst = comp.createInstance();
  inst.name = "Text Block";
  inst.resize(200, 18);
  inst.clipsContent = false;
  inst.constraints = {
    horizontal: "CENTER",
    vertical: "CENTER",
  };
  inst.layoutAlign = "INHERIT";
  inst.layoutGrow = 0;
  inst.backgrounds = [];
  inst.fills = [];
  inst.strokes = [];
  inst.strokeWeight = 1;
  inst.strokeAlign = "INSIDE";
  inst.effects = [];

  // 2
  const comp2 = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, 100, Dark=True"
  ) as ComponentNode;
  const inst2 = comp2.createInstance();
  inst2.name = "Text Block";
  inst2.resize(316, 12);
  inst2.clipsContent = false;
  inst2.constraints = {
    horizontal: "CENTER",
    vertical: "CENTER",
  };
  inst2.layoutAlign = "INHERIT";
  inst2.layoutGrow = 0;
  inst2.backgrounds = [];
  inst2.fills = [];
  inst2.strokes = [];
  inst2.strokeWeight = 1;
  inst2.strokeAlign = "INSIDE";
  inst2.effects = [];

  // 3
  const comp3 = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, 200, Dark=True"
  ) as ComponentNode;
  const inst3 = comp3.createInstance();
  inst3.name = "Text Block";
  inst3.resize(277, 12);
  inst3.clipsContent = false;
  inst3.constraints = {
    horizontal: "CENTER",
    vertical: "CENTER",
  };
  inst3.layoutAlign = "INHERIT";
  inst3.layoutGrow = 0;
  inst3.backgrounds = [];
  inst3.fills = [];
  inst3.strokes = [];
  inst3.strokeWeight = 1;
  inst3.strokeAlign = "INSIDE";
  inst3.effects = [];

  // 4
  const comp4 = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, 200, Dark=True"
  ) as ComponentNode;
  const inst4 = comp4.createInstance();
  inst4.name = "Text Block";
  inst4.resize(175, 12);
  inst4.clipsContent = false;
  inst4.constraints = {
    horizontal: "CENTER",
    vertical: "CENTER",
  };
  inst4.layoutAlign = "INHERIT";
  inst4.layoutGrow = 0;
  inst4.backgrounds = [];
  inst4.fills = [];
  inst4.strokes = [];
  inst4.strokeWeight = 1;
  inst4.strokeAlign = "INSIDE";
  inst4.effects = [];

  // update childrens
  componentNode.insertChild(0, inst);
  componentNode.insertChild(1, inst2);
  componentNode.insertChild(2, inst3);
  componentNode.insertChild(3, inst4);

  return componentNode;
}

// RUN THE FIGMA PLUGIN.
async function main() {
  const nodes: SceneNode[] = [];
  // const nd = createScreenNode();
  // const nd2 = createButtonNode();
  // nodes.push(nd2);
  // Pushed the created nodes here.
  // nodes.push(await getCreateNodes());
  // const cmp = await getComponent();
  // nodes.push(cmp);

  // title
  // const title = createSmallTitle();
  // nodes.push(title);

  // text block
  // const textBlock = createTextBlock();
  // nodes.push(textBlock);

  // componen set
  // createSmallTitleV1();
  // title.appendChild(textBlock);

  const componentSet = createTitleComponentSet([
    createSmallTitleV1(),
    createSmallTitleV2(),
    createSmallTitleV3(),
  ]);
  nodes.push(componentSet);

  // create text block
  const tb = createTextBlockV1();
  nodes.push(tb);

  // create button
  const btn = createButtonNode();
  nodes.push(btn);

  // create screen
  const screen = createScreenNode();
  nodes.push(screen);

  // create page
  const page = createPageNode();
  for (let i = 0; i < nodes.length; i++) {
    page.appendChild(nodes[i]);
  }
  // page.appendChild(nodes);

  
  // figma.currentPage.selection = nodes;
  // figma.viewport.scrollAndZoomIntoView(nodes);

  // checkComponent()

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
}

// Get the component from the figma file. only work for published components.
async function getComponent(): Promise<ComponentNode> {
  const comp = await figma.importComponentByKeyAsync(
    "b5b97e8de7f76ba8b6082d91a3207a2c4d0b1545"
  );
  console.log(comp);

  // figma.combineAsVariants([comp], comp.parent, 0);

  // const st : ComponentSetNode = {}

  return comp;
}

function createTitleComponentSet(comp: Array<ComponentNode>): ComponentSetNode {
  const componentSet = figma.combineAsVariants(comp, figma.currentPage, 0);

  componentSet.name = "pix2fig-small-title";
  return componentSet;
}

function checkComponent() {
  const comp = figma.currentPage.findOne(
    (node) => node.name === "Property 1=Medium, Default, Dark=True"
  ) as ComponentNode;

  console.log(comp);
}

// createPageNode check is there is a page with the name "pix2fig" if not create one.
function createPageNode():PageNode{
  const page = figma.createPage();
  page.name = "pix2fig";
  return page;
}

main();
