import pkg from 'pg';
const { Client } = pkg;

// DBClient connect to the database.
export class DBClient {
  client:  pkg.Client;
  constructor(
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
  ) {
    this.client = new Client({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });
  }
  // ping the database and return the client.
  async ping(): Promise<pkg.Client> {
    await this.client.connect();
    try {
      const res = await this.client.query("SELECT NOW()");
      console.log(`connecting to database: ${res.rows[0]}`);
    } catch (error) {
      console.error(`unable to connect to database ${error}`);
      throw error;
    }
    return this.client;
  }
}
