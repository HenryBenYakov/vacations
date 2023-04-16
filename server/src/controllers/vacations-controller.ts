import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import {
  addVacation,
  deleteVacation,
  followAsync,
  getAllVacations,
  getOneVacation,
  unFollowAsync,
  updateVacation,
} from "../logic/vacations-logic";
import { verifyAdmin } from "../middlewares/verify-admin";
import { verifyLoggedIn } from "../middlewares/verify-logged-in";
import { FollowerModel } from "../models/followers-model";
import { VacationModel } from "../models/vacation-model";
import { getUserIdFromToken } from "../utils/auth";
import { getVacationImageFile, notFoundImageFile } from "../utils/locations";

export const VacationsRouter = express.Router();

// GET http://localhost:3001/api/vacations/
VacationsRouter.get(
  "/api/vacations/",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.header("authorization");
      const userID = getUserIdFromToken(authHeader);
      const vacations = await getAllVacations(userID);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:3001/api/vacations/:id
VacationsRouter.get(
  "/api/vacations/:id",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vacation = await getOneVacation(id);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/vacations
VacationsRouter.post(
  "/api/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const addedVacation = await addVacation(vacation);
      response.status(201).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:3001/api/vacations/:id
VacationsRouter.put(
  "/api/vacations/:id",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const id = +request.params.id;
      request.body.vacationID = id;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:3001/api/vacations/:id
VacationsRouter.delete(
  "/api/vacations/:id",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await deleteVacation(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

VacationsRouter.get(
  "/api/vacations/images/:imageName",
  (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;

      let imageFile = getVacationImageFile(imageName);
      if (!fs.existsSync(imageFile)) imageFile = notFoundImageFile;

      response.sendFile(imageFile);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/follow
VacationsRouter.post(
  "/api/follow",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const follower = new FollowerModel(request.body);
      const follow = await followAsync(follower);
      response.status(201).json(follow);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/unFollow
VacationsRouter.post(
  "/api/unFollow",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const follower = new FollowerModel(request.body);
      const unFollow = await unFollowAsync(follower);
      response.status(201).json(unFollow);
    } catch (err: any) {
      next(err);
    }
  }
);
