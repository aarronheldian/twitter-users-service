import express from "express";
import { isAuthenticated } from "../middlewares/auths.middleware";
import followsController from "../controllers/follows.controller";
import {
  validateRequestParams,
  validateRequestQuery,
} from "@/middlewares/schemaValidator.middleware";
import {
  paramsSchemaListFollows,
  querySchemaListFollows,
} from "@/schemas/follows.schema";

const followsRoute = express.Router();

followsRoute.post(
  "/:following",
  isAuthenticated,
  followsController.handleFollowUser
);
followsRoute.delete(
  "/:following",
  isAuthenticated,
  followsController.handleUnfollowUser
);
followsRoute.get(
  "/followers/:userId",
  isAuthenticated,
  validateRequestParams(paramsSchemaListFollows),
  validateRequestQuery(querySchemaListFollows),
  followsController.handleListFollowers
);
followsRoute.get(
  "/followings/:userId",
  isAuthenticated,
  followsController.handleListFollowings
);

export default followsRoute;
