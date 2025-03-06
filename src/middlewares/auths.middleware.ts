import { NextFunction, Request, Response } from "express";
import ErrorResponse from "@/utils/errorResponse";
import env from "@/utils/env";
import authsService from "@/services/auths.service";
import usersRepository from "@/repositories/users.repository";
import { IUser } from "@/interfaces/users.types";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    const decodedAccessToken = await authsService.verifyToken(
      accessToken,
      env.JWT_ACCESS_SECRET
    );
    const user = await usersRepository.findById(decodedAccessToken.sub);

    if (!user) {
      return next(
        new ErrorResponse("User not found. Authentication failed.", 401)
      );
    }

    res.locals.user = {
      _id: user._id,
      fullName: user.fullName,
      handle: user.handle,
      email: user.email,
      profilePicture: user.profilePicture,
      banner: user.banner,
      birthDate: user.birthDate,
    } as Omit<IUser, "password">;

    return next();
  } catch (error) {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      try {
        const activeRefreshToken = await authsService.verifyRefreshTokenExist(
          refreshToken
        );
        const decodedRefreshToken = await authsService.verifyToken(
          activeRefreshToken.refreshToken,
          env.JWT_REFRESH_SECRET
        );
        const user = await usersRepository.findById(decodedRefreshToken.sub);

        if (!user) {
          return next(
            new ErrorResponse("User not found. Authentication failed.", 401)
          );
        }

        res.locals.user = {
          _id: user._id,
          fullName: user.fullName,
          handle: user.handle,
          email: user.email,
          profilePicture: user.profilePicture,
          banner: user.banner,
          birthDate: user.birthDate,
        } as Omit<IUser, "password">;

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
