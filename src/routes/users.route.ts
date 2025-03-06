import express from "express";
import { isAuthenticated } from "../middlewares/auths.middleware";
import usersController from "../controllers/users.controller";

const authsRoute = express.Router();

authsRoute.get("/:handle", isAuthenticated, usersController.handleDetailUser);

export default authsRoute;
