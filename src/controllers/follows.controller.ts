import { NextFunction, Request, Response } from "express";
import followsService from "@/services/follows.service";

const followsController = {
  handleFollowUser: async (req: Request, res: Response, next: NextFunction) => {
    const { following } = req.params;
    const { _id: follower } = res.locals.user;

    try {
      await followsService.followUser(follower, following);
      return res.status(200).json({
        success: true,
        code: 200,
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
      return res.status(200).json({
        success: true,
        code: 200,
        message: "User successfully unfollowed.",
      });
    } catch (error) {
      return next(error);
    }
  },
  handleListFollows: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { following, follower } = req.query;

    try {
      const listFollows = await followsService.getListFollows({
        following: following as string,
        follower: follower as string,
      });
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Follow list retrieved successfully.",
        data: listFollows,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default followsController;
