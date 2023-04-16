import { NextFunction, Request, Response } from "express";
import { verifyToken, getUserRoleFromToken } from "../utils/auth";
import { ForbiddenError, UnauthorizedError } from "../models/client-errors";
import { RoleModel } from "../models/role-model";

export async function verifyAdmin(
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

  const role = getUserRoleFromToken(authHeader);

  if (role - 1 !== RoleModel.Admin) {
    next(new ForbiddenError("You are not authorized"));
    return;
  }

  next();
}
