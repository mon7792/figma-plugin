import { json } from "body-parser";
import express from "express";
import { Options } from "../../common/env";
import { ErrorHandler } from "./middleware/errors";
import { TodoController } from "../../controllers/todos";
import { TodoGateway } from "../../gateways/todos.gateway";
import { AuthController } from "../../controllers/auth";
import session from "express-session"
import { UserGateway } from "../../gateways/users.gateway";

export default class ExpressApp {
  private app: express.Application;
  private opts: Options; // todo start from here.
  private todoController: TodoController;
  private authController: AuthController;

  // constructor(gamesRepository: GamesRepository, opts: Options)
  constructor(todoGateway: TodoGateway, userGateway: UserGateway,opts: Options) {
    this.app = express();
    this.todoController = new TodoController(todoGateway);
    this.authController = new AuthController(userGateway);
    this.opts = opts;
  }

  private register = () => {
    this.app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))
    this.app.use(this.authController.initialise());
    this.app.use(this.authController.session());

    // rate-limit: TODO: work on the rate limiting metrics
    // static
    this.app.use(express.static("public"));
    //  json
    this.app.use(json());
    this.app.get("/todo", this.todoController.getTodos);
    this.app.post("/todo", this.todoController.addTodo);
    this.app.get("/todo/:id", this.todoController.getTodo);
    this.app.put("/todo/:id", this.todoController.updateTodo);

    // auth routes
    this.app.get("/auth/login", this.authController.login);
    this.app.get("/auth/logout", this.authController.logout);
    this.app.get("/auth/github",this.authController.github());
    this.app.get(
      "/auth/github/callback",
      this.authController.githubCallbackMiddleware(),
      this.authController.callback
    );

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
