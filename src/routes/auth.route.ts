import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

const authRoute = express.Router();

authRoute.post("/register", authController.handleRegister);
authRoute.post("/login", authController.handleRegister);
authRoute.get("/my-profile", isAuthenticated, authController.handleMyProfile);

export default authRoute;
