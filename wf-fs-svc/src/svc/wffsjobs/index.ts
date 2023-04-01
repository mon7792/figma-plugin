import { DBClient } from "../../dependency/db";
import { QueClient } from "../../dependency/queue";
import { ProcessFile } from "../../usecase/processfile.usecase";
import { DBStore } from "../../driver/db";
import { FileStore } from "../../driver/files";
import { QueueStore } from "../../driver/queue";

console.log("Hello World... starting jobs");

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

  // get the queue
  const queClt = new QueClient("amqp://localhost");
  const queConn = await queClt.connect();

  const prcFs = new ProcessFile(
    new DBStore(dbClt),
    new QueueStore(queConn),
    new FileStore(),
    "http://localhost:5000/"
  );
  await prcFs.exec("upload");

  await dbClt.end();
  await queConn.close();
}

async function rt() {
  await main();
}

rt();
