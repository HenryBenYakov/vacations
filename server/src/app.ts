import express from "express";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import { sanitize } from "./middlewares/sanitize";
import { AuthRouter } from "./controllers/auth-controller";
import { VacationsRouter } from "./controllers/vacations-controller";
import { routeNotFound } from "./middlewares/route-not-found";
import { catchAll } from "./middlewares/catch-all";
import { databaseMigration } from "./utils/db";

const app = express();

const PORT = 3001;

app.use(
  "/api/",
  expressRateLimit({
    windowMs: 500,
    max: 50,
    message:
      "You have exceeded the allowed amount of times for browsing the site.",
  })
);

app.use(sanitize);

app.use(cors());

app.use(express.json());

app.use(expressFileUpload());

app.use("/", AuthRouter);
app.use("/", VacationsRouter);

app.use("*", routeNotFound);

app.use(catchAll);

(async () => {
  await databaseMigration();
  app.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
})();
