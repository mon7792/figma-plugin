import RedisStore from "connect-redis";
import { RedisClientType, createClient } from "redis";

// Postgres Class exposes method to connect, disconnect and access to cache store.
export class Redis {
  client: RedisClientType;

  constructor() {
    this.client = createClient();
  }

  // connects to the database.
  async connect(): Promise<void> {
    await this.client.connect();
  }

  // ping queries the database and checks if the version.
  Store(): RedisStore {
    return new RedisStore({
      client: this.client,
      prefix: "myapp:",
    });
  }

  // disconnect from the database.
  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
    } catch (err: any) {
      throw Error(err);
    }
  }
}
