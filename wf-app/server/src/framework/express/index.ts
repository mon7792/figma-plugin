import { json } from "body-parser";
import express from "express";
import { Options } from "../../common/env";
import { ErrorHandler } from "./middleware/errors";
import { TodoController } from "../../controllers/todos";

export default class ExpressApp {
  private app: express.Application;
  private opts: Options; // todo start from here.
  private todoController: TodoController;

// constructor(gamesRepository: GamesRepository, opts: Options) 
  constructor(opts: Options) {
    this.app = express();
    this.todoController = new TodoController()
    this.opts = opts;
  }

  private register = () => {
    // rate-limit: TODO: work on the rate limiting metrics
    // static
    this.app.use(express.static('public'))
    //  json
    this.app.use(json());
    this.app.get("/", this.todoController.home);
    this.app.get("/todo", this.todoController.getTodos);
    this.app.post("/todo", this.todoController.addTodo);
    this.app.get("/todo/:id", this.todoController.getTodo);
    this.app.put("/todo/:id", this.todoController.updateTodo);

    // All the route should be declared above this route.
    // The 404 Last Route.
    this.app.get("*", function (req, res) {
      res.status(404);
    //   res.send(SetAPIResponse(404, "the route does not exist"));
    });

    // attach errorHandler after router handler
    this.app.use(ErrorHandler);
  };

  start() {
    this.register();

    this.app.listen(this.opts.apiPortNo, () => {
      console.log("Server listening on port 8080");
    });
  }
}