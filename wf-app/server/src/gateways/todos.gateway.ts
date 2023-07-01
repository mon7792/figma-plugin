export interface TodoGateway{
    getTodos(): Promise<Array<string>>
    insertTodo(title: string): Promise<void> 
}