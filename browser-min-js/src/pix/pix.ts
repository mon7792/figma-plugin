const pixNodeList = [
  "body",
  "header",
  "btn-active",
  "btn-inactive",
  "row",
  "single",
  "double",
  "quadruple",
  "btn-green",
  "btn-orange",
  "btn-red",
  "big-title",
  "small-title",
  "text",
  "def",
] as const;

type pixNodeType = typeof pixNodeList[number];

//  check if the node type is valid
// function isNodeType(nd: string):nd is pixNodeType{
//     let check = false
//     pixNodeList.forEach(pxNode => {
//         if (pxNode === nd){
//             check = true
//             break
//         }
//     })
//     return check
// }

// getPixNodeType typecast nd string into pixNodeType.
function getPixNodeType(nd: string): pixNodeType | undefined {
  return pixNodeList.filter((pixNd) => pixNd === nd)[0];
}

// pixNode represent the
export type pixNode = {
  name: pixNodeType;
  children: Array<pixNode>;
};

const dslInput = `
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
`;

// getPixNode return the pixNodeTree from input.
function getPixNode(input: string): pixNode {
  // 1. trim white spaces at the start and end.
  input = input.trim();

  //2. variable declaration
  // token store pixNodeType
  let token = "";
  // pxNode store entire node tree
  let pxNode: pixNode = { name: "body", children: [] };
  // pixTokenStack
  let pixTokenStack: Array<pixNode> = [];
  pixTokenStack.push(pxNode);

  for (let i = 0; i < input.length; i++) {
    // { element
    if (input[i] === "{") {
      token = token.trim();
      // TODO: check if the node is valid
      // get node type from token
      let pTkn = getPixNodeType(token);
      if (pTkn === undefined) {
        // TODO: deal with this
        continue;
      }
      // create a new new node
      let pixToken: pixNode = { name: pTkn, children: [] };

      if (pixTokenStack.length === 0) {
        pixTokenStack.push(pixToken);
      } else {
        // add the element to children
        pixTokenStack[pixTokenStack.length - 1].children.push(pixToken);
        //  push it to top of stack
        pixTokenStack.push(pixToken);
      }

      // reset the token
      token = "";
      continue;
    }

    // , element
    if (input[i] === ",") {
      token = token.trim();
      // TODO: check if the node is valid
      // get node type from token
      let pTkn = getPixNodeType(token);
      if (pTkn === undefined) {
        // TODO: deal with this
        continue;
      }
      // create a new new node
      let pixToken: pixNode = { name: pTkn, children: [] };

      // push the token in the current element stack
      pixTokenStack[pixTokenStack.length - 1].children.push(pixToken);

      // reset the token
      token = "";
      continue;
    }

    // } element
    if (input[i] === "}") {
      token = token.trim();
      if (token === "") {
        //  pop it to top of stack
        pixTokenStack.pop();
        continue;
      }
      // TODO: check if the node is valid
      // get node type from token
      let pTkn = getPixNodeType(token);
      if (pTkn === undefined) {
        // TODO: deal with this
        continue;
      }
      // create a new new node
      let pixToken: pixNode = { name: pTkn, children: [] };

      // add the element to children
      pixTokenStack[pixTokenStack.length - 1].children.push(pixToken);
      //  pop it to top of stack
      pixTokenStack.pop();

      // reset the token
      token = "";
      continue;
    }
    token = token + input[i];
  }

  return pxNode;
}

export function readDSL() {
  console.log("reading DSL");
  let nd = getPixNode(dslInput);

  console.log(nd);
  // displayPixNode(nd);
}

function displayPixNode(pxNode: pixNode) {
  if (pxNode === undefined) {
    return;
  }
  console.log(pxNode.name);

  for (let i = 0; i < pxNode.children.length; i++) {
    displayPixNode(pxNode.children[i]);
  }
}
