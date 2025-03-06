import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import env from "../utils/env";

const middlewareCheckorigin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (env.ALLOWED_ORIGIN.split(",").includes(req?.headers?.host || "")) {
    return next();
  } else {
    const error = new ErrorResponse("Access forbidden.", 403);
    return next(error);
  }
};

export default middlewareCheckorigin;
