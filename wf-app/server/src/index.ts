import express, { json } from "express";

import router from "./routes";
import ExpressApp from "./framework/express";
import { Options } from "./common/env";
import { getAppOpts } from "./common/env";


let opts: Options = getAppOpts()

const exp = new ExpressApp(opts)
exp.start()
// const app = express();

// app.use(express.static('public'))
// app.use(express.json())
// app.use(router);

// app.listen(3000, () => {
//   console.log(`Example app listening on port 3000`);
// });
