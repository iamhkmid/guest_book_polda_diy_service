import { altairExpress } from "altair-express-middleware";
import express from "express";

const altairRoute = express.Router();

type TCheckEnv = (req: express.Request, res: express.Response, next: express.NextFunction) => void

const checkEnv: TCheckEnv = (req, res, next) => {
  process.env.NODE_ENV === "development"
    ? next()
    : res.end("Development only");
}

altairRoute.use("/",
  altairExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
    initialQuery: ``,
  })
);

export default altairRoute;
