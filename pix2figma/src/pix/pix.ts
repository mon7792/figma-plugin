// pixFigmaNodeType represents the mapped figma component
type pixFigmaNodeType =
  | "pix2fig-screen"
  | "pix2fig-text"
  | "pix2fig-small-title";

type pixFigmaDSLType = "pix2fig-row" | "pix2fig-single";

// pixComponentPage returns the page containing pix figma component.
const pixComponentPage = figma.root.findOne(
  (node) => node.type === "PAGE" && node.name == "pix2fig-components"
) as PageNode;

// createButton return the instance of Button.
function createButton(componentPage: PageNode): InstanceNode {
  const starButton = componentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-button"
  ) as InstanceNode;
  console.log(starButton.type);

  return starButton.clone();
}

// createTitle return the instance of Title.
function createTitle(componentPage: PageNode): InstanceNode {
  const title = componentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-small-title"
  ) as InstanceNode;
  console.log(title.type);

  return title.clone();
}

// createTitle return the instance of Title.
function createText(componentPage: PageNode): InstanceNode {
  const title = componentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-text"
  ) as InstanceNode;
  console.log(title.type);

  return title.clone();
}

// TODO: createHorizontalContainer , create Vertical COnta
// createContainer
function createContainer(instances: Array<InstanceNode>): FrameNode {
  const rowFrame = figma.createFrame();
  rowFrame.name = "rwo-single";

  // structure: resize to entire desktop width.
  rowFrame.resize(1280, 100);

  // add the layout
  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "HORIZONTAL";
  rowFrame.primaryAxisSizingMode = "FIXED";
  rowFrame.counterAxisSizingMode = "AUTO";

  // Space between children
  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];
  // 00314D

  // children
  instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// createScreen returns the instance of blank screen.
function createScreen(
  nodeType: pixFigmaNodeType,
  componentPage: PageNode
): FrameNode {
  const blankScreenFrame = componentPage
    .findOne((node) => node.type === "FRAME" && node.name == "pix2fig-screen")
    ?.clone() as FrameNode;

  // structure: resize to entire desktop width.
  blankScreenFrame.resize(1280, 832);

  // add the layout
  blankScreenFrame.layoutPositioning = "AUTO";
  blankScreenFrame.layoutMode = "VERTICAL";
  blankScreenFrame.primaryAxisSizingMode = "FIXED";

  // Space between children
  blankScreenFrame.horizontalPadding = 10;
  blankScreenFrame.verticalPadding = 10;
  blankScreenFrame.itemSpacing = 10;

  return blankScreenFrame;
}

// pixHeader returns the figmaPixHeader
function pixHeader(instances: Array<InstanceNode>): FrameNode {
  return createContainer(instances);
}

// createRowContainer c
function pixRow(instances: Array<FrameNode>): FrameNode {
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-row";

  // structure: resize to entire desktop width.
  rowFrame.resize(1280, 100);

  // add the layout
  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "HORIZONTAL";
  rowFrame.primaryAxisSizingMode = "FIXED";
  rowFrame.counterAxisSizingMode = "AUTO";

  // Space between children
  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];
  // 00314D

  // children
  instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// createRowContainer c
function pixSingle(instances: Array<InstanceNode>): FrameNode {
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-single";

  // structure: resize to entire desktop width.
  rowFrame.resize(1280, 100);

  // add the layout
  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "VERTICAL";
  // rowFrame.primaryAxisSizingMode = "FIXED";
  // rowFrame.counterAxisSizingMode = "AUTO";

  // Space between children
  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];
  // 00314D

  // children
  instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// readDSL read the DSL and create figma nodes
export function readDSL(): SceneNode {
  const screen = createScreen("pix2fig-screen", pixComponentPage);
  const header = pixHeader([
    createButton(pixComponentPage),
    createButton(pixComponentPage),
  ]);

  const title = createTitle(pixComponentPage);
  const text = createText(pixComponentPage);
  const button = createButton(pixComponentPage);

  const single = pixSingle([title, text, button]);
  const row = pixRow([single]);

  
  screen.appendChild(header);
  screen.appendChild(row);

  return screen;
}
