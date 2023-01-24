console.log("starting html parser");

const rAZ = new RegExp('([A-Z])');
const raz = new RegExp('([a-z])');
const r09 = new RegExp('([0-9])');

// ElementData stores tag name and the attributes
type ElementData = {
  tagName: string;
  attribute: Map<string, string>;
};

// NodeType store different HTML Node type BMJ can handle.
export enum NodeType {
  TEXT,
  ELEMENT,
  COMMENT,
}

// HNode stores all the DOM tree
export type HNode = {
  type: NodeType;
  data: ElementData | string;
  children: Array<HNode>;
};

// text create TEXT Node
function text(data: string): HNode {
  return {
    type: NodeType.TEXT,
    data: data,
    children: [],
  };
}

// comment create COMMENT Node
function comment(data: string): HNode {
  return {
    type: NodeType.COMMENT,
    data: data,
    children: [],
  };
}

// elem create ELEM Node
function elem(
  name: string,
  attrs: Map<string, string>,
  children: Array<HNode>
): HNode {
  return {
    type: NodeType.ELEMENT,
    data: {
      tagName: name,
      attribute: attrs,
    },
    children: children,
  };
}


// 1. Q: WAP in the language of your choice, and write code to represent a tree of DOM text nodes and elements.
let DOMTREE: HNode;

let h1 = elem("h1", null, [text("H1")]);
let button = elem("button", null, [text("SUBMIT")]);
let div = elem("div", null, [button]);
let body = elem("body", null, [h1, div]);
let title = elem("title", null, [text("sample")]);
let head = elem("head", null, [title]);
let html = elem("html", null, [head, body]);

// TODO: pending print preety.
// 2.  Q: WAP to pretty-print a tree of DOM nodes.
DOMTREE = html;
console.log("DISPLAY DOMTREE");

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

//  display the dom tree the 
// showNode(DOMTREE);



// PARSER:
export default class HTMLParser {
  // the html string input
  input: string;
  // string position pointer
  pos: number;
  // inputSz represent size of input
  inputSz: number;
  constructor(input: string) {
    this.input = input;
    this.pos = 0;
    this.inputSz = input.length;
  }

  // nextChar  returns next character without consuming it
  nextChar(): string {
    if (this.pos + 1 < this.inputSz) {
      return this.input[this.pos];
    }
    return "NOCHAR";
  }

  // currChar returns the char without conusming
  currChar(): string {
    return this.input[this.pos];
  }

  // startsWith checks if next character start with the given string
  startsWith(s: string): boolean {
    return this.input[this.pos].startsWith(s);
  }

  // eof returns true if all the character is consumed
  eof(): boolean {
    return this.pos >= this.inputSz;
  }

  // consumeChar consume the character and increment the position counter    
  consumeChar(): string{
    let ch = this.input[this.pos]
    this.pos = this.pos + 1
    return ch
  }

  consumeWhile(test: Function): string {
    let result = ""
    while(!this.eof() && test(this.currChar())){
        result += this.consumeChar();
    }
    return result
  }

  private whiteSpaceCheck(input: string): boolean {
    return input === " "
  }

  consumeWhiteSpace(){
    this.consumeWhile(this.whiteSpaceCheck);
  }

  private endtagCheck(input: string): boolean {
    if (input !== ">"){
      return true
    }
    return false
  }

  consumeEndTag(){
    this.consumeWhile(this.endtagCheck);
    this.pos +=  1
  }

  private tagName(input: string): boolean {
    if (rAZ.test(input) || raz.test(input) || r09.test(input)){
        return true
    } 
    return false
  }

  // parseTagName returns the tag associated with the node.   
  parseTagName(): string{
        // if tag name '/'
        // if (this.currChar ==){

        // }
        return this.consumeWhile(this.tagName);
  }

  private textParse(input: string): boolean {
    return input != '<'
  }

  parseText(): HNode{
    return text(this.consumeWhile(this.textParse))
  }

  parseElement(): HNode{
    
    let tagName ;
    let attrs;
    let children;

    // Opening tag.
    if(this.consumeChar() === "<"){
      tagName = this.parseTagName();
      // attrs
    }

    // content
    if(this.consumeChar() === ">"){
      children = this.parseNodes()
    }

    // closing tag
    this.consumeEndTag()

    if (tagName === ""){
        return null
    }

    return elem(tagName, attrs, children)
  }

  parseNode(): HNode{

    let ch = this.currChar()
    if (ch === "<"){
      return this.parseElement()
    }

    return this.parseText()
  }

  parseNodes(): Array<HNode>{
    let nodes : Array<HNode> = [];
    while(!this.eof()){
        this.consumeWhiteSpace()
        let nd = this.parseNode()
        if (nd == null){
           continue
        }
        nodes.push(nd)
    }

    return nodes;
  }


  parse(): HNode{

    return elem("root", null, this.parseNodes());
  }

}
