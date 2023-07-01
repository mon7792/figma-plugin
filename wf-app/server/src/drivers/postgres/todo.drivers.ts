import { Pool } from "pg";
import { TodoGateway } from "../../gateways/todos.gateway";
import { TodoResponse } from "../../types";

export class TodoDriver implements TodoGateway{
  private pgClient: Pool;

  constructor(pgClient: Pool) {
    this.pgClient = pgClient;
  }

  async getTodos(): Promise<Array<TodoResponse>> {
    const query = `select id, task, done from todo`;
    const res = await this.pgClient.query(query);
    if (res.rows.length === 0) {
      return [];
    }

    let task: Array<TodoResponse> = [];
    res.rows.forEach((elem) => {
      task.push({id: elem.id, title: elem.task, done: elem.done});
    });

    return task;
  }


  async insertTodo(title: string): Promise<void> {
    const query = `insert into todo(task) values($1)`;

    const values = [title];
    await this.pgClient.query(query, values);
    return
  }
}
