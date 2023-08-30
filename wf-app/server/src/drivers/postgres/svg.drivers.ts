import { Pool } from "pg";
import { SVGResponse } from "../../types";
import { SVGGateway } from "../../gateways/svg.gateway";

// insert svg
const insertSVGQuery = `insert into svg(uid, prompt, user_id)
select $1, $2, id
from users
where username=$3`

// get svg
const getSVGQuery = `select uid, prompt from svg
inner join user
where svg.user_id= user.id
and username=$1`

// id SERIAL PRIMARY KEY,
// uid VARCHAR(11) UNIQUE NOT NULL,
// prompt VARCHAR(500) NOT NULL,
// generated BOOLEAN DEFAULT false,
// created_at TIMESTAMP DEFAULT NOW(),
// updated_at TIMESTAMP DEFAULT NOW(),

// SVGDriver implements the SVG Functionality.
export class SVGDriver implements SVGGateway {
  private pgClient: Pool;

  constructor(pgClient: Pool) {
    this.pgClient = pgClient;
  }

  // insertSVG creates a entry in svg table with unqiue id and prompt.
  async insertSVG(uid: string, prompt: string,  userID: string): Promise<void> {
    const values = [uid, prompt, userID];
    await this.pgClient.query(insertSVGQuery, values);
    return;
  }

  // getSVG returns a list of SVG for a particular user.
  async getSVG(userID: string): Promise<Array<SVGResponse>> {
    const values = [userID];
    const res = await this.pgClient.query(getSVGQuery, values);
    if (res.rows.length === 0) {
      return []
    }

    let resp: Array<SVGResponse> = [];
    res.rows.forEach((elem) => {
      resp.push({ id: elem.id, prompt: elem.prompt, url: [] });
    });

    return resp;
  }
  async getSVGByID(id: string): Promise<SVGResponse> {
    return {
      id: "",
      prompt: "",
      url: [],
    };
  }

  async getTodos(): Promise<void> {
    const query = `select id, task, done from todo`;
    const res = await this.pgClient.query(query);
    if (res.rows.length === 0) {
      return ;
    }

    // let task: Array<TodoResponse> = [];
    // res.rows.forEach((elem) => {
    //   task.push({ id: elem.id, title: elem.task, done: elem.done });
    // });

    // return task;
  }

  async insertTodo(title: string): Promise<void> {
    const query = `insert into todo(task) values($1)`;

    const values = [title];
    await this.pgClient.query(query, values);
    return;
  }
}
