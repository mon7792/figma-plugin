import { Request, Response } from "express";
import { TodoGateway } from "../gateways/todos.gateway";

export class TodoController {
  public todoGateway: TodoGateway
  constructor(todoGateway: TodoGateway) {
    this.todoGateway = todoGateway;
  }

  home = (req: Request, res: Response) => {
    res.send(`{"name":"puzzle-api"}`);
  };

  addTodo = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    console.log(req.body);
    res.sendStatus(200);
  };

  getTodos = async (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    let todos = await this.todoGateway.getTodos()
    res.send(todos);
  };

  getTodo = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    res.send([{ title: "sadfs" }]);
  };

  updateTodo = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    res.send([{ title: "sadfs" }]);
  };
}
export const addTodo = (req: Request, res: Response) => {
  // 1. extract the todo description from the body.
  // 2.
  console.log(req.body);
  res.sendStatus(200);
};
