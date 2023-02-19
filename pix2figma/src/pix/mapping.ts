import {
  createButton,
  createScreen,
  createText,
  createTitle,
  pixDouble,
  pixHeader,
  pixQuadruple,
  pixRow,
  pixSingle,
} from "./pix";

export let dslPixMap = new Map<string, string>([
  ["body", "pix2fig-screen"],
  ["header", "pix2fig-header"],
  ["btn-active", "pix2fig-button"],
  ["btn-inactive", "pix2fig-button"],
  ["row", "pix2fig-row"],
  ["single", "pix2fig-single"],
  ["double", "pix2fig-double"],
  ["quadruple", "pix2fig-quadruple"],
  ["btn-green", "pix2fig-button"],
  ["btn-orange", "pix2fig-button"],
  ["btn-red", "pix2fig-button"],
  ["big-title", "pix2fig-small-title"],
  ["small-title", "pix2fig-small-title"],
  ["text", "pix2fig-text"],
  ["def", "pix2fig-text"],
]);

// getPixFigmaNode returns the mapped figma components.
export function getPixFigmaNode(
  dslInput: string
): FrameNode | InstanceNode {
  switch (dslInput) {
    case "body":
      return createScreen();
    case "header":
      return pixHeader();
    case "row":
      return pixRow();
    case "single":
      return pixSingle();
    case "double":
      return pixDouble();
    case "quadruple":
      return pixQuadruple();
    case "btn-active":
      return createButton();
    case "btn-inactive":
      return createButton();
    case "btn-green":
      return createButton();
    case "btn-orange":
      return createButton();
    case "btn-red":
      return createButton();
    case "big-title":
      return createTitle();
    case "small-title":
      return createTitle();
    case "text":
      return createText();
    default:
      return createText();
  }
}

