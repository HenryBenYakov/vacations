import { NextFunction, Request, Response } from "express";
import fsPromises from "fs/promises";

export async function catchAll(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const fileName = "./src/assets/logs/error-logs.txt";

  console.log(err);

  const now = new Date();

  await fsPromises.appendFile(
    fileName,
    `${now} -> ${err.status}: ${err.message}\n----------------------------------------------------------------------------------------------\n`
  );

  const statusCode = err.status ? err.status : 500;

  response.status(statusCode).send(err.message);
}
