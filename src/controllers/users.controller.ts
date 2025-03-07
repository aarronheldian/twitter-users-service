import { NextFunction, Request, Response } from "express";
import usersService from "@/services/users.service";
import { StatusCodes } from "http-status-codes";

const usersController = {
  handleDetailUser: async (req: Request, res: Response, next: NextFunction) => {
    const { handle } = req.params;

    try {
      const data = await usersService.getDetailUser(handle);
      return res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "User created successfully.",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default usersController;
