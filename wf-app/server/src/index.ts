import express, { json } from "express";

import router from "./routes";

const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(router);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
