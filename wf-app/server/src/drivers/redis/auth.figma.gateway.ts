import { RedisClientType } from "redis";

export class AuthFigmaDriver implements AuthFigmaDriver {
  private rdClient: RedisClientType;

  constructor(rdClient: RedisClientType) {
    this.rdClient = rdClient;
  }

  async setReadWriteKeys(rKey: string, wKey: string): Promise<void> {
    await this.rdClient.set(rKey, wKey);
    await this.rdClient.expire(rKey, 3000);
    await this.rdClient.set(wKey, "");
    await this.rdClient.expire(wKey, 3000);
  }

  async getKey(rKey: string): Promise<string> {
    const result = await this.rdClient.get(rKey)
    if (result === null){
      throw Error("key does not exist")
    }
    return "";
  }

  async checkKeyExist(key: string): Promise<boolean> {
    const result = await this.rdClient.get(key)
    if (result === null){
      return false
    }
    return true;
  }
}
