const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// TODO: make this dynamic
// OIDC client
const clientID = "6142976f939897fe33a5";
const clientSecret = "ada80a305fd5dad0ea3a5957b56a7fd6c619b58e"


// TODO: make this dynamic
app.use(
  express.static("/Volumes/hack/Projects/figma-plugin/wf-fs-ui/src/public")
);

// app.get("/", (req, res) => res.send("Hello World!"));

// OIDC redirect url
app.get("/oauth/redirect", (req, res) => {

  const requestToken = req.query.code;
  axios({
    // make a POST request
    method: "post",
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token;
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
