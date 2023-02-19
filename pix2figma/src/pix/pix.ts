// pixFigmaNodeType represents the mapped figma component
type pixFigmaNodeType =
  | "pix2fig-screen"
  | "pix2fig-text"
  | "pix2fig-small-title"
  | "pix2fig-button";

type pixFigmaDSLType =
  | "pix2fig-header"
  | "pix2fig-row"
  | "pix2fig-single"
  | "pix2fig-double"
  | "pix2fig-quadruple";

// pixComponentPage returns the page containing pix figma component.
const pixComponentPage = figma.root.findOne(
  (node) => node.type === "PAGE" && node.name == "pix2fig-components"
) as PageNode;

// createButton return the instance of Button.
export function createButton(): InstanceNode {
  const starButton = pixComponentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-button"
  ) as InstanceNode;

  return starButton.clone();
}

// createTitle return the instance of Title.
export function createTitle(): InstanceNode {
  const title = pixComponentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-small-title"
  ) as InstanceNode;

  return title.clone();
}

// createText return the instance of Text.
export function createText(): InstanceNode {
  const title = pixComponentPage.findOne(
    (node) => node.type === "INSTANCE" && node.name === "pix2fig-text"
  ) as InstanceNode;

  return title.clone();
}

// createScreen returns the instance of blank desktop screen.
export function createScreen(): FrameNode {
  const blankScreenFrame = pixComponentPage
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

// pixHeader returns a frame node with full width by adding instances horizontally
export function pixHeader(): FrameNode {
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-header";

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
  // instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

export function addChildren(
  nd: FrameNode | InstanceNode,
  instances: Array<InstanceNode | FrameNode>
) {
  instances.map((instance) => nd.appendChild(instance));
}

// pixRow creates a frame node with full width by adding instances horizontally
export function pixRow(): FrameNode {
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
  // instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// pixSingle creates a frame node with full width by adding instances vertically
export function pixSingle(): FrameNode {
  // create frame
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-single";

  // add the layout
  // resize to desktop width.
  rowFrame.resize(1280, 100);

  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "VERTICAL";

  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  // fills 00314D
  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];

  // children
  // instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// pixDouble creates a frame node with half width by adding instances vertically
export function pixDouble(): FrameNode {
  // create frame
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-double";

  // add the layout
  // resize to desktop width.
  rowFrame.resize(640, 100);

  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "VERTICAL";

  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  // fills 00314D
  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];

  // children
  // instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// pixDouble creates a frame node with one forth width by adding instances vertically
export function pixQuadruple(): FrameNode {
  // create frame
  const rowFrame = figma.createFrame();
  rowFrame.name = "pix2fig-quadruple";

  // add the layout
  // resize to desktop width.
  rowFrame.resize(320, 100);

  rowFrame.layoutPositioning = "AUTO";
  rowFrame.layoutMode = "VERTICAL";

  rowFrame.horizontalPadding = 10;
  rowFrame.verticalPadding = 10;
  rowFrame.itemSpacing = 10;

  // fills 00314D
  rowFrame.fills = [{ type: "SOLID", color: { r: 0, g: 0.14, b: 0.23 } }];

  // children
  // instances.map((instance) => rowFrame.appendChild(instance));
  return rowFrame;
}

// readDSL read the DSL and create figma nodes
export function readDSL(): SceneNode {
  // screen
  const screen = createScreen();
  const header = pixHeader();
  addChildren(header, [createButton(), createButton()]);

  // 1st row
  let title = createTitle();
  let text = createText();
  let button = createButton();
  const single = pixSingle();
  addChildren(single, [title, text, button]);

  const row1 = pixRow();
  addChildren(row1, [single]);

  // 2nd row - 1 column
  title = createTitle();
  text = createText();
  button = createButton();
  const double1 = pixDouble();
  addChildren(double1, [title, text, button]);

  // 2nd row - 2 column
  title = createTitle();
  text = createText();
  button = createButton();
  const double2 = pixDouble();
  addChildren(double2, [title, text, button]);

  const row2 = pixRow();
  addChildren(row2, [double1, double2]);

  // 3nd row - 1 column
  title = createTitle();
  text = createText();
  button = createButton();
  const quad1 = pixQuadruple();
  addChildren(quad1, [title, text, button]);

  // 3nd row - 1 column
  title = createTitle();
  text = createText();
  button = createButton();
  const quad2 = pixQuadruple();
  addChildren(quad2, [title, text, button]);

  // 3nd row - 1 column
  title = createTitle();
  text = createText();
  button = createButton();
  const quad3 = pixQuadruple();
  addChildren(quad3, [title, text, button]);

  // 3nd row - 1 column
  title = createTitle();
  text = createText();
  button = createButton();
  const quad4 = pixQuadruple();
  addChildren(quad4, [title, text, button]);

  const row3 = pixRow();
  addChildren(row3, [quad1, quad2, quad3, quad4]);

  // add child
  screen.appendChild(header);
  screen.appendChild(row1);
  screen.appendChild(row2);
  screen.appendChild(row3);

  return screen;
}

/*
PROGRAM TO PRINT:


SAMPLE:
header {
btn-inactive, btn-inactive
}
row {
single {
small-title, text, btn-red
}
}

RESULT:
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
*/

/*
PROGRAM TO PRINT:


SAMPLE:
header {
btn-inactive, btn-inactive
}
row {
single {
small-title, text, btn-orange
}
}
row {
double {
small-title, text, btn-green
}
double {
small-title, text, btn-green
}
}
}


RESULT:
// screen
  const screen = createScreen("pix2fig-screen", pixComponentPage);
  const header = pixHeader([
    createButton(pixComponentPage),
    createButton(pixComponentPage),
  ]);

  // 1st row
  let title = createTitle(pixComponentPage);
  let text = createText(pixComponentPage);
  let button = createButton(pixComponentPage);
  const single = pixSingle([title, text, button]);
  const row1 = pixRow([single]);
  
  // 2nd row - 1 column
  title = createTitle(pixComponentPage);
  text = createText(pixComponentPage);
  button = createButton(pixComponentPage);
  const double1 = pixDouble([title, text, button]);
  
  // 2nd row - 2 column
  title = createTitle(pixComponentPage);
  text = createText(pixComponentPage);
  button = createButton(pixComponentPage);
  const double2 = pixDouble([title, text, button]);
  const row2 = pixRow([double1, double2]);

  // add child
  screen.appendChild(header);
  screen.appendChild(row1);
  screen.appendChild(row2);

  return screen;
*/
