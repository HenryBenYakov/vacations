import jwt from "jsonwebtoken";
import { RoleModel } from "../models/role-model";
import { UserModel } from "../models/user-model";

const secretKey = "VacationHenB";

export function generateNewToken(user: UserModel): string {
  const container = { user };
  const token = jwt.sign(container, secretKey, { expiresIn: "2h" });
  return token;
}

export function verifyToken(authHeader: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (!authHeader) {
        resolve(false);
        return;
      }

      const token = authHeader.substring(7);

      if (!token) {
        resolve(false);
        return;
      }

      jwt.verify(token, secretKey, (err) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    } catch (err: any) {
      reject(err);
    }
  });
}

export function getUserRoleFromToken(authHeader: string): RoleModel {
  const token = authHeader.substring(7);
  const container = jwt.decode(token) as { user: UserModel };
  const user = container.user;
  const role = user.roleID;
  return role;
}

export function getUserIdFromToken(authHeader: string): RoleModel {
  const token = authHeader.substring(7);
  const container = jwt.decode(token) as { user: UserModel };
  const user = container.user;
  const id = user.userID;
  return id;
}
