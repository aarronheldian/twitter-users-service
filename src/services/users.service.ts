import ErrorResponse from "@/utils/errorResponse";
import usersRepository from "@/repositories/users.repository";
import { StatusCodes } from "http-status-codes";

const usersService = {
  getDetailUser: async (handle: string) => {
    const user = await usersRepository.findByEmailOrHandle(handle);
    if (!user)
      throw new ErrorResponse("User not found.", StatusCodes.NOT_FOUND);
    return user;
  },
};

export default usersService;
