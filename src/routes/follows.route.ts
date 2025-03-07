import express from "express";
import { isAuthenticated } from "../middlewares/auths.middleware";
import followsController from "../controllers/follows.controller";

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
followsRoute.get("/", isAuthenticated, followsController.handleListFollows);

export default followsRoute;
