import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { SetAPIResponse } from "../../../common/api/response";
import { BaseError } from "../../../common/errors";

// errInnvalidJsonStr contains body parser middlware invalid json error text. 
const errInnvalidJsonStr = "Unexpected token"

// ErrorHandler middleware logs the Error and send appropriate message
export const ErrorHandler: ErrorRequestHandler = (
  Error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Application Error
  if (Error instanceof BaseError) {
    res.status(Error.statusCode || 500);
    res.send(SetAPIResponse(Error.statusCode || 500, Error.displayMessage || "INTERNAL SERVER ERROR"));
    console.error(Error.message);
    return;
  }

  // Body Parser Middleware Error
  if (Error instanceof SyntaxError && Error.message.includes(errInnvalidJsonStr)) {
    console.error(Error);
    res.status(400);
    res.send(SetAPIResponse(400, "invalid json body"));
    return;
  }

  // JWT Middleware Error
  if (Error.name.includes("UnauthorizedError")) {
    console.error(Error);
    res.status(401);
    res.send(SetAPIResponse(401, "invalid token"));
    return;
  }
  
  console.error(Error);
  res.status(500);
  res.send(SetAPIResponse(500, "oops... something went wrong"));
};