import express from "express";
import { isAuthenticated } from "../middlewares/auths.middleware";
import authsController from "../controllers/auths.controller";

const authsRoute = express.Router();

authsRoute.post("/register", authsController.handleRegister);
authsRoute.post("/login", authsController.handleLogin);
authsRoute.get("/my-profile", isAuthenticated, authsController.handleMyProfile);
authsRoute.post("/logout", authsController.handleLogout);

export default authsRoute;
