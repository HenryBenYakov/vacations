import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../models/client-errors";

export function routeNotFound(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const err = new RouteNotFoundError(request.originalUrl);

  next(err);
}
