import express from "express";
import { isAuthenticated } from "../middlewares/auths.middleware";
import followsController from "../controllers/follows.controller";

const followsRoute = express.Router();

followsRoute.post(
  "/:handle",
  isAuthenticated,
  followsController.handleFollowUser
);

export default followsRoute;
