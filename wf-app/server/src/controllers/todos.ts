import { Request, Response } from "express";
import { TodoGateway } from "../gateways/todos.gateway";
import { TodoRequest } from "../types";
import { AddTodo } from "../usecases/addtodo.usecase";

export class TodoController {
  public todoGateway: TodoGateway;
  constructor(todoGateway: TodoGateway) {
    this.todoGateway = todoGateway;
  }

  home = (req: Request, res: Response) => {
    res.send(`{"name":"puzzle-api"}`);
  };

  addTodo = async (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    const newTodo: TodoRequest = req.body as TodoRequest;
    if (newTodo.title.trim() === "") {
      res.sendStatus(400);
      return;
    }

    // 2. save the title in the database
    const addTodo = new AddTodo(this.todoGateway);
    await addTodo.exec(newTodo.title);
    console.log(`Todo ${newTodo.title} added to the database`);
    res.sendStatus(200);
  };

  getTodos = async (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    let todos = await this.todoGateway.getTodos();
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
