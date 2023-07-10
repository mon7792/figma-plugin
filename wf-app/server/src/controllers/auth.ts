import { NextFunction, Request, Response } from "express";
import passport, { PassportStatic, use } from "passport";
import GitHubStrategy from "passport-github";


export class AuthController {
  passport: PassportStatic;
  constructor() {
    this.passport = passport.use(
      new GitHubStrategy.Strategy(
        {
          clientID: "",
          clientSecret: "",
          callbackURL: "",
        },
        function (
          accessToken: string,
          refreshToken: string,
          results: any,
          profile: any,
          done: any
        ) {
          console.log(profile);
          //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
          //     return done(err, user);
          //   });
          done(null, {id: profile.id})
        }
      )
    );

    // this.passport.serializeUser((user, done)=>{
    //   done(null, user)
    // })

    // this.passport.deserializeUser((id, done)=>{
    //   console.log(id)
    //   done(null, user)
    // })

    this.passport.serializeUser(function (user, done) {
      done(null, user);
    });
    this.passport.deserializeUser(function (user: any, done) {
      done(null, user);
    });
  }

  passobj = () => {
    return this.passobj
  }
  initialise = () => {
    return this.passport.initialize();
  };
  // reg = () => {
  //   this.passport.serializeUser(function (user, done) {
  //     done(null, user);
  //   });
  //   this.passport.deserializeUser(function (user: any, done) {
  //     done(null, user);
  //   });
  // };
  session = () => {
    return this.passport.session();
  };
  login = (req: Request, res: Response) => {
    console.log("login is fired")
    res.send(`{"name":"login route"}`);
  };

  logout = (req: Request, res: Response) => {
    res.send(`{"name":"puzzle-api"}`);
  };


  github = (): ((req: Request, res: Response)=> void)  => {
    return this.passport.authenticate("github", { scope: ["user:email"] });
  };

  githubCallbackMiddleware = (): ((req: Request, res: Response, next: NextFunction) => void) => {
    return this.passport.authenticate("github");
  };

  callback = (req: Request, res: Response) => {
    console.log("callback is fired")
    res.send(`{"name":"redirect"}`);
  };
}
