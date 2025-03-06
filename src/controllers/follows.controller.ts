import { NextFunction, Request, Response } from "express";
import followsService from "@/services/follows.service";

const followsController = {
  handleFollowUser: async (req: Request, res: Response, next: NextFunction) => {
    const { handle } = req.params;
    const { _id: followerId } = res.locals.user;

    try {
      const data = await followsService.followUser(followerId, handle);
      return res.status(200).json({
        success: true,
        code: 200,
        message: "User successfully followed.",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default followsController;
