import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utils/errorResponse";

const middlewareErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Ressource not found ${err.value}.`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (val: any) => " " + val.message
    );
    error = new ErrorResponse(message.join(", "), 400);
  }

  //Mongoose duplicate value
  if (err.code === 11000) {
    const message = "Duplicate field value entered.";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.codeStatus || 500).json({
    success: false,
    code: error.codeStatus || 500,
    message: error.message || "Server error.",
  });
};

export default middlewareErrorHandler;
