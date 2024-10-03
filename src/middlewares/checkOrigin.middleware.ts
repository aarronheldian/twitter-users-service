import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";

const middlewareCheckorigin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.headers.host === "localhost:6300") {
    return next();
  } else {
    const error = new ErrorResponse("Access forbidden.", 403);
    return next(error);
  }
};

export default middlewareCheckorigin;
