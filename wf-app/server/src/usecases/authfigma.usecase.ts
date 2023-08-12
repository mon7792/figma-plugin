import { AuthFigmaGateway } from "../gateways/auth.figma.gateway";

import signature from "cookie-signature";

const keySize: number = 11;
export class AuthFigma {
  constructor(private authFigmaGateway: AuthFigmaGateway) {}

  async getKeys(): Promise<Array<string>> {
    const rKey = this.genRandomID(keySize);
    const wKey = this.genRandomID(keySize);
    await this.authFigmaGateway.setReadWriteKeys(rKey, wKey);
    return [rKey, wKey];
  }

  private genRandomID(size: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < size) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async getStatus(rKey: string): Promise<string> {
    const result = await this.authFigmaGateway.getKey(rKey);
    return result;
  }

  async checkKey(key: string): Promise<boolean> {
    return await this.authFigmaGateway.checkKeyExist(key);
  }

  async setWKeyAndSessionID(wKey: string, sessionID: string): Promise<void> {
    await this.authFigmaGateway.setReadWriteKeys(wKey, `myapp:${sessionID}`);
  }

  async checkSessionAuthenticated(
    rKey: string,
    secret: string
  ): Promise<string> {
    const wKey = await this.authFigmaGateway.getKey(rKey);
    console.log(wKey)
    const sessionID = await this.authFigmaGateway.getKey(wKey);
    console.log(sessionID)
    // todo: here if the person has not clicked on signIN not session ID will exists
    const sessionInfo = await this.authFigmaGateway.getKey(sessionID);
    console.log(sessionInfo)
    const passportInfo = JSON.parse(sessionInfo)["passport"];
    if (typeof passportInfo === "undefined") {
      return "";
    }
    return this.getSignedSessionID(sessionID, secret);
  }

  private getSignedSessionID(val: string, secret: string): string {
    return signature.sign(val, secret);
  }
}

// generate Keys
