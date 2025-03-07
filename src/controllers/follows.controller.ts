import { NextFunction, Request, Response } from "express";
import followsService from "@/services/follows.service";
import { StatusCodes } from "http-status-codes";
import { querySchemaListFollows } from "@/schemas/follows.schema";

const followsController = {
  handleFollowUser: async (req: Request, res: Response, next: NextFunction) => {
    const { following } = req.params;
    const { _id: follower } = res.locals.user;

    try {
      await followsService.followUser(follower, following);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        code: StatusCodes.CREATED,
        message: "User successfully followed.",
      });
    } catch (error) {
      return next(error);
    }
  },
  handleUnfollowUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { following } = req.params;
    const { _id: follower } = res.locals.user;

    try {
      await followsService.unfollowUser(follower, following);
      return res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "User successfully unfollowed.",
      });
    } catch (error) {
      return next(error);
    }
  },
  handleListFollowers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    const { page, limit } = querySchemaListFollows.parse(req.query);

    try {
      const listFollows = await followsService.getListFollowers(userId, {
        page,
        limit,
      });
      return res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "Followers list retrieved successfully.",
        data: listFollows,
      });
    } catch (error) {
      return next(error);
    }
  },
  handleListFollowings: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    const { page, limit } = querySchemaListFollows.parse(req.query);

    try {
      const listFollows = await followsService.getListFollowings(userId, {
        page,
        limit,
      });
      return res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "Followings list retrieved successfully.",
        data: listFollows,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default followsController;
