import express, { Request, Response, NextFunction } from "express";
import { CredentialsModel } from "../models/credentials-model";
import { UserModel } from "../models/user-model";
import { register, login, usernameIsTaken } from "../logic/auth-logic";

export const AuthRouter = express.Router();

//* POST http://localhost:3001/api/auth/register
AuthRouter.post(
  "/api/auth/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      const token = await register(user);
      response.status(201).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

//* POST http://localhost:3001/api/auth/login
AuthRouter.post(
  "/api/auth/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

//* GET http://localhost:3001/api/auth/:username
AuthRouter.get(
  "/api/auth/:username",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const username = request.params.username;
      const exists = await usernameIsTaken(username);
      response.json(exists);
    } catch (err: any) {
      next(err);
    }
  }
);
