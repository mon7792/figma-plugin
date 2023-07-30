import { json } from "body-parser";
import express from "express";
import { Options } from "../../common/env";
import { ErrorHandler } from "./middleware/errors";
import { TodoController } from "../../controllers/todos";
import { TodoGateway } from "../../gateways/todos.gateway";
import { AuthController } from "../../controllers/auth";
import session from "express-session";
import { UserGateway } from "../../gateways/users.gateway";
import { AuthHandler } from "./middleware/auth";
import RedisStore from "connect-redis";
import { AuthFigmaGateway } from "../../gateways/auth.figma.gateway";

export default class ExpressApp {
  private app: express.Application;
  private opts: Options; // todo start from here.
  private todoController: TodoController;
  private authController: AuthController;
  private sessionStore: RedisStore;

  constructor(
    todoGateway: TodoGateway,
    userGateway: UserGateway,
    authFigmaGateway: AuthFigmaGateway,
    sessionStore: RedisStore,
    opts: Options
  ) {
    this.app = express();
    this.todoController = new TodoController(todoGateway);
    this.authController = new AuthController(userGateway, authFigmaGateway);
    this.sessionStore = sessionStore;
    this.opts = opts;
  }

  private register = () => {
    // client html application
    this.app.use(express.static("public"));

    // express-session.
    this.app.use(
      session({
        name: "sid",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 * 8 },
        store: this.sessionStore,
      })
    );
    this.app.use(this.authController.passport.initialize());
    this.app.use(this.authController.passport.session());

    // rate-limit: TODO: work on the rate limiting metrics
    // static

    //  json
    this.app.use(json());
    this.app.get("/todo", this.todoController.getTodos);
    this.app.post("/todo", this.todoController.addTodo);
    this.app.get("/todo/:id", this.todoController.getTodo);
    this.app.put("/todo/:id", this.todoController.updateTodo);

    // auth routes
    this.app.get("/auth/login", this.authController.login);
    this.app.get("/auth/logout", this.authController.logout);
    this.app.get("/auth/github", this.authController.github());
    this.app.get(
      "/auth/github/callback",
      this.authController.githubCallbackMiddleware(),
      this.authController.callback
    );

    this.app.get("/profile", this.authController.profile);
    this.app.get(
      "/profile-secure",
      AuthHandler,
      this.authController.profileSecure
    );
    this.app.get("/profile-un-secure", this.authController.profileUnSecure);

    // figma login
    this.app.get("/auth/figma/keys", this.authController.getfigmaKeys);
    this.app.get("/auth/figma/key/status", this.authController.getfigmaKeyStatus);
    this.app.get("/auth/figma/login", this.authController.figmaLoginMiddleware,this.authController.github());

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
