const figma = require("figma-js");

const token = `figd_jACLbQdF9PI3HmIpBidwE8j6bSb71yDgcqCXa5bT`;

const client = figma.Client({ personalAccessToken: token });

// client.file("NiCAOsQKb7nfkIiH7JOaIn").then((res) => {
//   console.log(res);
// });

const fsID = "NiCAOsQKb7nfkIiH7JOaIn";
let fsParams = {
  ids: ["339:3694"],
};
client.fileNodes(fsID, fsParams).then((res: any) => {
    console.log(res.data);
});

console.log("Hello, world!");
