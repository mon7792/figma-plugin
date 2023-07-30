
export interface AuthFigmaGateway{
    setReadWriteKeys(rKey:string, wKey:string):Promise<void>  
    // setReadWriteKeys(rKey:string, wKey:string):Promise<void>  
    getKey(rKey:string):Promise<string>
    checkKeyExist(key: string): Promise<boolean> 
}