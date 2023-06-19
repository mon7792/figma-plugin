import { Pool } from "pg";

// Postgres Class exposes method to connect and disconnect from the database.
export class Postgres {
  readonly versionQuery: string = `select version() as vs`;
  pgPool: Pool;

  constructor(
    host: string,
    database: string,
    user: string,
    password: string,
    port: number,
    ssl: boolean
  ) {

    this.pgPool = new Pool({
      host: host,
      database: database,
      user: user,
      password: password,
      port: port,
      ssl: ssl,
    });
  }

  // connects to the database.  
  async connect(): Promise<Pool> {
    try {
      await this.ping();
    } catch (err: any) {
      throw Error(err);
    }
    return this.pgPool;
  }

  // ping queries the database and checks if the version.
  private async ping(): Promise<void> {
    try {
      const res = await this.pgPool.query(this.versionQuery);


      console.log("connected to database: ",res.rows[0]["vs"]);
    } catch (err: any) {
      throw Error(err);
    }
  }

  // disconnect from the database.
  async disconnect(): Promise<void> {
    try {
      await this.pgPool.end();
    } catch (err: any) {
      throw Error(err);
    }
  }
}