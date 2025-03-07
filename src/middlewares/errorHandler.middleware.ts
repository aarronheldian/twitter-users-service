import { ErrorRequestHandler } from "express";
import ErrorResponse from "@/utils/errorResponse";
import { StatusCodes } from "http-status-codes";

const middlewareErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Ressource not found ${err.value}.`;
    error = new ErrorResponse(message, StatusCodes.NOT_FOUND);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (val: any) => " " + val.message
    );
    error = new ErrorResponse(message.join(", "), StatusCodes.BAD_REQUEST);
  }

  //Mongoose duplicate value
  if (err.code === 11000) {
    const message = "Duplicate field value entered.";
    error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
  }

  res.status(error.codeStatus || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    code: error.codeStatus || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Server error.",
  });
};

export default middlewareErrorHandler;
