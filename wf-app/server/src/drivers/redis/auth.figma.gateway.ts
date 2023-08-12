import { RedisClientType } from "redis";

export class AuthFigmaDriver implements AuthFigmaDriver {
  private rdClient: RedisClientType;

  constructor(rdClient: RedisClientType) {
    this.rdClient = rdClient;
  }

  async setReadWriteKeys(rKey: string, wKey: string): Promise<void> {
    await this.rdClient.set(rKey, wKey);
    await this.rdClient.expire(rKey, 3000);
    await this.rdClient.set(wKey, "{}");
    await this.rdClient.expire(wKey, 3000);
  }

  async setWriteKeySessionID(wKey:string, sessionID:string):Promise<void>{
    // await this.rdClient.del(wKey);
    await this.rdClient.set(wKey, sessionID);
    // await this.rdClient.expire(wKey, 3000);
  }

  async getKey(rKey: string): Promise<string> {
    const result = await this.rdClient.get(rKey)
    if (result === null){
      console.log(`key: ${rKey} does not exist`)
      throw Error(`key: ${rKey} does not exist`)
    }
    return result;
  }

  async checkKeyExist(key: string): Promise<boolean> {
    const result = await this.rdClient.get(key)
    if (result === null){
      return false
    }
    return true;
  }
}
