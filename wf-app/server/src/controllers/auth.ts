import { NextFunction, Response, Request } from "express";
import passport, { PassportStatic } from "passport";
import GitHubStrategy from "passport-github";
import { UserGateway } from "../gateways/users.gateway";
import { User } from "../types";
import { AuthFigmaGateway } from "../gateways/auth.figma.gateway";
import { AuthFigma } from "../usecases/authfigma.usecase";

export class AuthController {
  passport: PassportStatic;
  userGateway: UserGateway;
  authFigmaGateway: AuthFigmaGateway;
  constructor(userGateway: UserGateway, authFigmaGateway: AuthFigmaGateway) {
    this.userGateway = userGateway;
    this.passport = passport.use(
      new GitHubStrategy.Strategy(
        {
          clientID: "6142976f939897fe33a5",
          clientSecret: "4e556615fa3c32c6f58d57e34af7808e247d6b43",
          callbackURL: "http://localhost:8080/auth/github/callback",
        },
        async function (
          accessToken: string,
          refreshToken: string,
          results: any,
          profile: any,
          done: any
        ) {
          console.log(profile);
          const id: string = profile.id || "";
          const username: string = profile.username || "";
          const email: string = profile._json.email || "";
          console.log(`adding user ${id}-${username}-${email}`);
          const user = await userGateway.findOrCreateUser(id, username, email);
          done(null, user);
        }
      )
    );

    this.passport.serializeUser(function (user: User, done) {
      console.log(`serialise user: ${user}`);
      done(null, user.id);
    });
    this.passport.deserializeUser(async function (id: string, done) {
      console.log(`deserilaise user id: ${id}`);
      const user = await userGateway.findOrCreateUser(id, "", "");
      done(null, user);
    });

    this.authFigmaGateway = authFigmaGateway;
  }

  passobj = () => {
    return this.passobj;
  };
  initialise = () => {
    return this.passport.initialize();
  };

  session = () => {
    return this.passport.session();
  };

  login = (req: Request, res: Response) => {
    console.log("login is fired");
    res.send(`{"name":"login route"}`);
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/#/logout");
    });
  };

  github = (): ((req: Request, res: Response) => void) => { 
    return this.passport.authenticate("github", { scope: ["user:email"] });
  };

  githubCallbackMiddleware = (): ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void) => {
    return this.passport.authenticate("github");
  };

  callback = (req: Request, res: Response) => {
    console.log("callback is fired", JSON.stringify(req.user));
  
    // req.session.userID = req.user

    res.redirect("/#/callback");
  };

  profile = (req: Request, res: Response) => {
    console.log("profile is fired", req.user, JSON.stringify(req.session));
    res.setHeader("Content-Type", "application/json");
    const user: User = req.user as User;
    res.send(user);
  };

  profileSecure = (req: Request, res: Response) => {
    console.log("profile is secure", JSON.stringify(req.user));
    res.setHeader("Content-Type", "application/json");
    res.send(`{"user": "secure"}`);
  };

  profileUnSecure = (req: Request, res: Response) => {
    console.log("profile is un-secure");
    res.setHeader("Content-Type", "application/json");
    res.send(`{"user": "un-secure"}`);
  };

  // getfigmaKeys will generate and return the figma keys.
  getfigmaKeys = async (req: Request, res: Response) => {
    const authFigma = new AuthFigma(this.authFigmaGateway);
    const keys = await authFigma.getKeys();
    console.log("profile is un-secure");
    // console.log(req.cookies);
    res.setHeader("Content-Type", "application/json");
    res.send(`{"rKey": "${keys[0]}", "wKey": "${keys[1]}", "wSessionID": "${req.session.id}"}`);
  };

  getfigmaKeyStatus = async (req: Request, res: Response) => {
    
    
    // get the session info associated with read key->write key-> session id
    // check if the user exists & logged in.
    // return key as encrypted with token in body

    // extract read keys from body
    const rKey : string = req.header("x-read-key") as string || ""

    if(rKey.trim() === ""){
      res.setHeader("Content-Type", "application/json");
      res.send("read key cannot be empty");
      return
    }

    const authFigma = new AuthFigma(this.authFigmaGateway);
    // check if the key exists.
    const exists = await authFigma.checkKey(rKey);
    if (!exists){
      res.setHeader("Content-Type", "application/json");
      res.send("read key not present");
      return
    }

    // get the session info associated with read key->write key-> session id

    const result = await authFigma.checkSessionAuthenticated(rKey, "keyboard cat");
    if (result === ""){
      res.setHeader("Content-Type", "application/json");
      res.send("not authenticated yet");
      return
    }

    // console.log("profile is un-secure");
    res.setHeader("Content-Type", "application/json");
    res.send(`{"key": "${result}", "authenticated": true}`);
  };

  figmaLoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const loginWkey: string = req.query.loginWKey as string || "";
    console.log("session-id:",req.session.id)
    if (loginWkey.trim() === "") {
      res.send("login key not set");
      return;
    }
    const authFigma = new AuthFigma(this.authFigmaGateway);
    // check if the Auth Key Exists
    const keyStatus = await authFigma.checkKey(loginWkey)
    if (!keyStatus){
      res.send("invalid login key, close the current tab and try again.");
      return;
    }
    
    // set the Wkey &Session ID
    await authFigma.setWKeyAndSessionID(loginWkey, req.session.id);
    next();
  }; 
}
