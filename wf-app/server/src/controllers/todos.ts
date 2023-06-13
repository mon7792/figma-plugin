import { Request, Response } from "express"

export const addTodo  = (req: Request, res: Response) => {
    // 1. extract the todo description from the body.
    // 2. 
    console.log(req.body);
    res.sendStatus(200);
}