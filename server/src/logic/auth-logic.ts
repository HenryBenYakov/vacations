import { OkPacket } from "mysql";
import { generateNewToken } from "../utils/auth";
import { hash } from "../utils/cyber";
import { execute } from "../utils/db";
import { UnauthorizedError, ValidationError } from "../models/client-errors";
import { CredentialsModel } from "../models/credentials-model";
import { RoleModel } from "../models/role-model";
import { UserModel } from "../models/user-model";

//* Add New User:
export async function register(user: UserModel): Promise<string> {
  user.password = hash(user.password);

  const error = user.validate();
  if (error) throw new ValidationError(error);

  user.roleID = RoleModel.User;

  const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await execute(sql, [
    user.firstName,
    user.lastName,
    user.username,
    user.password,
    user.roleID + 1,
  ]);

  user.roleID = RoleModel.User + 1;

  user.userID = result.insertId;

  delete user.password;

  const token = generateNewToken(user);

  return token;
}

//* Login:
export async function login(credentials: CredentialsModel): Promise<string> {
  credentials.password = hash(credentials.password);

  const error = credentials.validate();
  if (error) throw new ValidationError(error);

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  const users = await execute(sql, [
    credentials.username,
    credentials.password,
  ]);

  const user = users[0];

  if (!user) throw new UnauthorizedError("Incorrect username or password");

  delete user.password;

  const token = generateNewToken(user);

  return token;
}

//* Check if the username is taken:
export async function usernameIsTaken(username: string): Promise<boolean> {
  const sql = `SELECT 1 FROM users WHERE username = ?`;

  const users = await execute(sql, username);

  if (users.length > 0) {
    return true;
  } else {
    return false;
  }
}
