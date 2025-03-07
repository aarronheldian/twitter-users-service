import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { StatusCodes } from "http-status-codes";

const validate = (schema: ZodTypeAny, source: "body" | "params" | "query") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      }
      next(error);
    }
  };
};

export const validateRequestBody = (schema: ZodTypeAny): RequestHandler =>
  validate(schema, "body");

export const validateRequestParams = (schema: ZodTypeAny): RequestHandler =>
  validate(schema, "params");

export const validateRequestQuery = (schema: ZodTypeAny): RequestHandler =>
  validate(schema, "query");
