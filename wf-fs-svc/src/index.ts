import { WireFrameController } from "./controller/wireframe";
import { ExpressApp } from "./framework/express";
import { FileStore } from "./driver/files";
import { DBStore } from "./driver/db";
import { DBClient } from "./dependency/db";
import { QueClient } from "./dependency/queue";
import { QueueStore } from "./driver/queue";

async function main() {
  // get the DB
  const dbClient = new DBClient(
    "127.0.0.1",
    5432,
    "postgres",
    "wffssvc123",
    "wffs"
  );

  const dbClt = await dbClient.ping();

  const queClt = new QueClient("amqp://localhost");
  const queConn = await queClt.connect();

  // instantiate the controller
  const wireFrameController = new WireFrameController(
    new FileStore(),
    new DBStore(dbClt),
    new QueueStore(queConn)
  );

  // instatiate the express app
  const expressApp = new ExpressApp(8080, wireFrameController);
  // register the routes
  expressApp.register();
  // start the server
  expressApp.start();
}

main();
