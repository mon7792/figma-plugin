// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

import { Client, FileNodesParams, Node } from "figma-js";

const token = `figd_jACLbQdF9PI3HmIpBidwE8j6bSb71yDgcqCXa5bT`;
const client = Client({ personalAccessToken: token });

// client.file("NiCAOsQKb7nfkIiH7JOaIn").then((res) => {
//   console.log(res);
// });

async function getCreateNodes(): Promise<ComponentNode> {
  const fsID = "NiCAOsQKb7nfkIiH7JOaIn";
  let fsParams: FileNodesParams = {
    ids: ["339:3695"],
  };
  const nodeRsp = await client.fileNodes(fsID, fsParams);

  const fsNodes = nodeRsp.data.nodes["339:3695"];
  if (fsNodes === undefined || fsNodes === null) {
    throw new Error("No nodes found");
  }
  console.log(fsNodes.document);
  console.log("=============");
  console.log("=============");
  console.log(fsNodes.components);
  console.log("=============");
  console.log("=============");
  console.log(fsNodes.styles);
  console.log("=============");
  console.log("=============");

  // console.log(fsNodes["339:3695"]);

  // create componenet
  // const comp = figma.createComponent();
  // comp.name = "test";
  return createComponentNode(fsNodes.document);
}

function createComponentNode(node: Node): ComponentNode {
  const componentNode = figma.createComponent();
  componentNode.name = node.id;
  // componentNode
  // compone

  // componentNode.type = node.type;

  return componentNode;
}

// RUN THE FIGMA PLUGIN.
async function main() {
  const nodes: SceneNode[] = [];
  const nd = await getCreateNodes();
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
