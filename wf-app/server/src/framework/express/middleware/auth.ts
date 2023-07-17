import { Request, Response, NextFunction, RequestHandler } from "express";
import { SetAPIResponse } from "../../../common/api/response";


// ErrorHandler middleware logs the Error and send appropriate message
export const AuthHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  // Body Parser Middleware Error
  if (typeof req.user === "undefined") {
    res.status(401);
    res.send(SetAPIResponse(401, "un-authorised"));
    return;
  }

  next()
};