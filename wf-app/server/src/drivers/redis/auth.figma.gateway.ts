import { RedisClientType } from "redis";

export class AuthFigmaDriver implements AuthFigmaDriver{
  private rdClient: RedisClientType;

  constructor(rdClient: RedisClientType) {
    this.rdClient = rdClient;
  }

 async setReadWriteKeys(rKey:string, wKey:string):Promise<void> {
    await this.rdClient.set(rKey, wKey)
    await this.rdClient.expire(rKey, 3000)
    await this.rdClient.set(wKey, "")
    await this.rdClient.expire(wKey, 3000)
 }
}
