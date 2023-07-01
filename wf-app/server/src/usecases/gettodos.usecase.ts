import { TodoGateway } from "../gateways/todos.gateway";
import { TodoResponse } from "../types";
export class GetTodos {
    constructor(private todoGateway: TodoGateway){}

    async exec(title: string, description: string): Promise<Array<TodoResponse>>{
        // return await this.todoGateway.getTodos()
        return []

    }
}