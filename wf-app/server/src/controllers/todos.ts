import { Request, Response } from "express";

export class TodoController {
  constructor() {}

  home = (req: Request, res: Response) => {
    res.send(`{"name":"puzzle-api"}`);
  };

  addTodo = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    console.log(req.body);
    res.sendStatus(200);
  };

  getTodos = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    res.send([{ title: "sadfs" }]);
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
