import CssParser from "./css/css";
import HTMLParser from "./html/html";
import { HNode, NodeType } from "./html/html";
import {showCssNode} from "./css/css";


// showNode recursive version
function showNode(nd: HNode) {
  if (nd === null) {
    return;
  }
  if (nd.type === NodeType.TEXT) {
    if (typeof nd.data === "string") {
      console.log(nd.data);
    }
  } else {
    if (typeof nd.data !== "string") {
      console.log(nd.data.tagName);
    }
  }
  if (nd.children == null || nd.children.length === 0) {
    return;
  }

  for (let i = 0; i < nd.children.length; i++) {
    showNode(nd.children[i]);
  }
}

// sampleHTML docs
let sampleHTML: string = `<html><head><title>sample</title></head><body><h1>H1</h1><div><button>SUBMIT</button></div></body></html>`;


const pars = new HTMLParser(sampleHTML)
console.log("PARSING HTML....")
let t = pars.parse()
console.log(t)
showNode(t)


console.log("PARSING CSS....")
console.log("PARSING CSS....")

let sampleCss = `
h1 { margin: auto; color: #cc0000; }
div.note { margin-bottom: 20px; padding: 10px; }
#answer { display: none; }
`

// h1, h2, h3 { margin: auto; color: #cc0000; }
// div.note { margin-bottom: 20px; padding: 10px; }
// #answer { display: none; }

const cssPar = new CssParser(sampleCss);
let ct = cssPar.parse()
showCssNode(ct)

