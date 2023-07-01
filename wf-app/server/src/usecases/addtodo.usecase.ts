import { addTodo } from "../entities/todos";
import { TodoGateway } from "../gateways/todos.gateway";
export class AddTodo {
  constructor(private todoGateway: TodoGateway) {}

  async exec(title: string): Promise<void> {
    let tds = addTodo(title, "");

    await this.todoGateway.insertTodo(tds.title);
  }
}
