
export interface AuthFigmaGateway{
    setReadWriteKeys(rKey:string, wKey:string):Promise<void>   
}