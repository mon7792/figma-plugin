import ExpressApp from "./framework/express";
import { Options } from "./common/env";
import { getAppOpts } from "./common/env";
import { TodoDriver } from "./drivers/postgres/todo.drivers";
import { Postgres } from "./dependencies/postgres";
import { Pool } from "pg";
import { UserDriver } from "./drivers/postgres/user.drivers";
import { Redis } from "./dependencies/redis";

async function main() {
  let opts: Options = getAppOpts();

  const postgres = new Postgres(
    opts.dbHostName,
    opts.dbName,
    opts.dbUserName,
    opts.dbPassword,
    opts.dbPortNo,
    opts.dbSsl
  );

  let pgPool: Pool;
  try {
    pgPool = await postgres.connect();
  } catch (error) {
    console.error(`unable to connect to database: error: ${error}`);
    return process.exit(1);
  }

  const redis = new Redis()
  try {
      await redis.connect();
  } catch (error) {
    console.error(`unable to connect to cache: error: ${error}`);
    return process.exit(1);
  }

  let todoDriver = new TodoDriver(pgPool);
  let userDriver = new UserDriver(pgPool);

  const app = new ExpressApp(todoDriver, userDriver, redis.Store(), opts);
  app.start();
}

main();
