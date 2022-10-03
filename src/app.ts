import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routs.config";
import { UsersRoutes } from "./users/users.routes.config";
import debug from "debug";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");
const runMsg = `Server is Running at http://localhost:${port}`;

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};
if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("------------------------------------- root" + runMsg);
  res.status(200).send(runMsg);
});

server.listen(port, () => {
  debugLog(runMsg);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes Configured for : ${route.getName()}`);
  });
});
