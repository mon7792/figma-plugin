
export interface AuthFigmaGateway{
    setReadWriteKeys(rKey:string, wKey:string):Promise<void>  
    setWriteKeySessionID(rKey:string, sessionID:string):Promise<void>  
    getKey(rKey:string):Promise<string>
    checkKeyExist(key: string): Promise<boolean> 
}