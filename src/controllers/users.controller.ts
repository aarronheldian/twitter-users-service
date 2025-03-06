import { NextFunction, Request, Response } from "express";
import usersService from "../services/users.service";

const usersController = {
  handleDetailUser: async (req: Request, res: Response, next: NextFunction) => {
    const { handle } = req.params;

    try {
      const data = await usersService.getDetailUser(handle);
      return res.status(200).json({
        success: true,
        code: 200,
        message: "User created successfully.",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default usersController;
