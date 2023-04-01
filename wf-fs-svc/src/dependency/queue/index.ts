import client, { Connection, Channel } from "amqplib";
// amqplib/callback_api
// QueClient connect to the AMQP.
export class QueClient {
  host: string;
  private connection: Connection;
  constructor( host: string) {
    this.host = host;
  }

  // connect to the AMQP.
  async connect(): Promise<Connection> {
    this.connection = await client.connect(this.host);
    return this.connection;
  }

  // close the connection to the AMQP.
  async close(): Promise<void> {
    await this.connection.close();
  }
}
