import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { IRequestLogin, IRequestRegister } from "../interfaces/auth.types";
import env from "../utils/env";

const authController = {
  handleRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IRequestRegister = req.body;
      const data = await authService.register(payload);
      return res.status(201).json({
        success: true,
        code: 201,
        message: "User created successfully.",
        data: {
          email: data.email,
          hanlde: data.handle,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  handleLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IRequestLogin = req.body;
      const data = await authService.login(payload);
      const accessToken = await authService.generateToken(
        data,
        env.JWT_ACCESS_SECRET,
        env.JWT_ACCESS_LIFETIME
      );
      const refreshToken = await authService.generateToken(
        data,
        env.JWT_REFRESH_SECRET,
        env.JWT_REFRESH_LIFETIME
      );

      await authService.storeRefreshToken(data, refreshToken);

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          success: true,
          code: 201,
          message: "Login successful.",
        });
    } catch (error) {
      return next(error);
    }
  },
  handleMyProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Auth successfully.",
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default authController;
