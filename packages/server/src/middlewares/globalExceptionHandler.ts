import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

function handleError(err: Error, response: Response) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default function globalExceptionHandler(err: Error, request: Request, response: Response, next: NextFunction) {
  return handleError(err, response);
}
