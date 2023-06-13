import { addTodo } from "../entities/todos";
export class AddTodo {
    constructor(){}

    exec(title: string, description: string): void{
        let tds = addTodo(title, description)
        console.log(tds)
    }
}