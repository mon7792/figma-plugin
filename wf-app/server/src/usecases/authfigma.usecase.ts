import { AuthFigmaGateway } from "../gateways/auth.figma.gateway";

const keySize: number = 11
export class AuthFigma {
    constructor(private authFigmaGateway: AuthFigmaGateway){}

    async getKeys(): Promise<Array<string>>{

        const rKey = this.genRandomID(keySize)
        const wKey = this.genRandomID(keySize)
        await this.authFigmaGateway.setReadWriteKeys(rKey,wKey)
        return [rKey, wKey]
    }

    private genRandomID(size: number): string{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < size) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}

// generate Keys