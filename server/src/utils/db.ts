import mysql from "mysql";
import { config } from "./config";

const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

console.log("Connected to MySQL");

export function execute(sql: string, values: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export async function databaseMigration() {
  await execute(
    `
    CREATE TABLE IF NOT EXISTS roles (
    roleID int(11) NOT NULL,
    roleName varchar(10) NOT NULL
  )`,
    []
  );

  await execute(
    `
      CREATE TABLE IF NOT EXISTS followers (
      userID int(11) NOT NULL,
      vacationID int(11) NOT NULL
    )`,
    []
  );

  await execute(
    `
    CREATE TABLE IF NOT EXISTS users (
    userID int(11) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    password varchar(128) NOT NULL,
    roleID int(11) NOT NULL
  )`,
    []
  );

  await execute(
    `
    CREATE TABLE IF NOT EXISTS vacations (
    vacationID int(11) NOT NULL,
    destination varchar(50) NOT NULL,
    description varchar(550) NOT NULL,
    imageName varchar(150) NOT NULL,
    fromDate date NOT NULL,
    untilDate date NOT NULL,
    price decimal(6,2) NOT NULL
  )`,
    []
  );
}
