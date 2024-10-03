import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import env from "../utils/env";
import authService from "../services/auth.service";
import userRepository from "../repositories/user.repository";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    const decodedAccessToken = await authService.verifyToken(
      accessToken,
      env.JWT_ACCESS_SECRET
    );
    const user = await userRepository.findById(decodedAccessToken.sub);

    if (!user) {
      return next(
        new ErrorResponse("User not found. Authentication failed.", 401)
      );
    }

    return next();
  } catch (error) {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      try {
        const activeRefreshToken = await authService.verifyRefreshTokenExist(
          refreshToken
        );
        const decodedRefreshToken = await authService.verifyToken(
          activeRefreshToken.refreshToken,
          env.JWT_REFRESH_SECRET
        );
        const user = await userRepository.findById(decodedRefreshToken.sub);

        if (!user) {
          return next(
            new ErrorResponse("User not found. Authentication failed.", 401)
          );
        }

        return next();
      } catch (error) {
        return next(
          new ErrorResponse("Invalid token. Please log in again.", 401)
        );
      }
    }
    return next(new ErrorResponse("Invalid token. Please log in again.", 401));
  }
};
