export interface TodoGateway{
    getTodos(): Promise<Array<string>>
}