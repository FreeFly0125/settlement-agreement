import { MESSAGES } from "consts";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "utils";
import { dbHandler } from "database";
import appRoute from "routes";
import { socketServer, sockets } from "socket";

dotenv.config();

const app = express();

const dbConnect = (next: NextFunction) => {
  try {
    dbHandler.initialize();
    Logger.error(MESSAGES.DB_INIT_SUCCESS);
    next();
  } catch (_err) {
    Logger.error(MESSAGES.DB_INIT_FAILED);
  }
};

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"))
  .use(appRoute);

const PORT = process.env.SERBER_PORT || 4000;

dbConnect(() => {
  app.listen(PORT, () => {
    Logger.log(MESSAGES.MSG_SERVER_STARTED);
  });
});

export default app;
