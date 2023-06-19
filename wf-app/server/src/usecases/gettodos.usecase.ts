import { TodoGateway } from "../gateways/todos.gateway";
export class GetTodos {
    constructor(private todoGateway: TodoGateway){}

    async exec(title: string, description: string): Promise<Array<string>>{
        return await this.todoGateway.getTodos()
    }
}