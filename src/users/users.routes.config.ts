import express from "express";
import { CommonRoutesConfig } from "../common/common.routs.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }
  configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of Users`);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send("Post to Users");
      });
    this.app
      .route("/users/:userId")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id : ${req.params.userId}`);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`POST request for ID: ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT request for ID: ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH request for ID: ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE request for ID: ${req.params.userId}`);
      });
    return this.app;
  }
}
