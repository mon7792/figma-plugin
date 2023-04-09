import * as Figma from "figma-js";

const token = `figd_jACLbQdF9PI3HmIpBidwE8j6bSb71yDgcqCXa5bT`;
const client = Figma.Client({ personalAccessToken: token });

// client.file("NiCAOsQKb7nfkIiH7JOaIn").then((res) => {
//   console.log(res);
// });

async function getNodes() {
  const fsID = "NiCAOsQKb7nfkIiH7JOaIn";
  let fsParams: Figma.FileNodesParams = {
    ids: ["339:3695"],
  };
  const nodeRsp = await client.fileNodes(fsID, fsParams);

  const fsNodes = nodeRsp.data.nodes;
  console.log(fsNodes["339:3695"]);
}

getNodes();


function createComponentNode(node: Figma.Node){
  const componentNode = figma.createComponent();
  componentNode.name = node.id;
  // compone

  // componentNode.type = node.type;



}
console.log("Hello, world!");
