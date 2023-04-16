import { MRole } from "./role";

export class MUser {
  public userID: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public roleID: MRole;
}
