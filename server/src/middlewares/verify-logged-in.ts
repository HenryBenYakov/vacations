import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";
import { UnauthorizedError } from "../models/client-errors";

export async function verifyLoggedIn(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.header("authorization");

  const isValid = await verifyToken(authHeader);

  if (!isValid) {
    next(new UnauthorizedError("You are not logged in"));
    return;
  }

  next();
}
