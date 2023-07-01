import { TodoResponse } from "../types"

export interface TodoGateway{
    getTodos(): Promise<Array<TodoResponse>>
    insertTodo(title: string): Promise<void> 
}