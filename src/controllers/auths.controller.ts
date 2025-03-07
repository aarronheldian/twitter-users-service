import { NextFunction, Request, Response } from "express";
import authsService from "@/services/auths.service";
import { IRequestLogin, IRequestRegister } from "@/interfaces/auths.types";
import env from "@/utils/env";
import { StatusCodes } from "http-status-codes";

const authsController = {
  handleRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IRequestRegister = req.body;
      const data = await authsService.register(payload);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        code: StatusCodes.CREATED,
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
      const data = await authsService.login(payload);
      const accessToken = await authsService.generateToken(
        data,
        env.JWT_ACCESS_SECRET,
        env.JWT_ACCESS_LIFETIME
      );
      const refreshToken = await authsService.generateToken(
        data,
        env.JWT_REFRESH_SECRET,
        env.JWT_REFRESH_LIFETIME
      );

      await authsService.storeRefreshToken(data, refreshToken);

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .status(StatusCodes.OK)
        .json({
          success: true,
          code: StatusCodes.OK,
          message: "Login successful.",
        });
    } catch (error) {
      return next(error);
    }
  },
  handleMyProfile: async (_: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        data: res?.locals?.user,
        message: "Auth successfully.",
      });
    } catch (error) {
      return next(error);
    }
  },
  handleLogout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      await authsService.deleteRefreshToken(refreshToken);

      return res
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .clearCookie("refreshToken", {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        })
        .status(StatusCodes.OK)
        .json({
          success: true,
          code: StatusCodes.OK,
          message: "Logout successful.",
        });
    } catch (error) {
      return next(error);
    }
  },
};

export default authsController;
