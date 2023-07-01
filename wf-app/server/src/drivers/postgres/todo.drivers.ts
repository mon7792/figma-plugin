import { Pool } from "pg";
import { TodoGateway } from "../../gateways/todos.gateway";

export class TodoDriver implements TodoGateway{
  private pgClient: Pool;

  constructor(pgClient: Pool) {
    this.pgClient = pgClient;
  }

  async getTodos(): Promise<Array<string>> {
    const query = `select task from todo`;
    const res = await this.pgClient.query(query);
    if (res.rows.length === 0) {
      return ["notodos"];
    }

    let task: Array<string> = [];
    res.rows.forEach((elem) => {
      task.push(elem.task);
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
