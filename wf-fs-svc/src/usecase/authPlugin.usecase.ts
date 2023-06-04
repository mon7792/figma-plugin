import NodeCache from "node-cache";

export class AuthPlugin {
  private cacheStore: NodeCache;
  constructor(cacheStore: NodeCache) {
    this.cacheStore = cacheStore;
  }

  //  create a function to generate a random string
  private createRandomString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // generateRWKeys generate Read and Write Keys
  public generateRWKeys(): Array<string> {
    const rKey = this.createRandomString(8);
    const wKey = this.createRandomString(8);
    // store the read write key in cache
    this.cacheStore.set(rKey, wKey, 3000);
    // store the write key login status.
    this.cacheStore.set(wKey, false, 3000);

    return [rKey, wKey];
  }

  // getLoginStatus check if the key exists , and find the corresponding status
  public getLoginStatus(key: string): string {
    const wKey = this.cacheStore.get(key) as string;
    if (wKey === undefined) {
      // handle miss!
      return "value does not exist";
    }

    const loginStatus = this.cacheStore.get(wKey) as boolean;
    if (loginStatus === undefined) {
      // handle miss!
      return "value does not exist";
    }

    return `${loginStatus}`;
  }
}
