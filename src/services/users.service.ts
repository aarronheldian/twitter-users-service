import ErrorResponse from "../utils/errorResponse";
import usersRepository from "../repositories/users.repository";

const usersService = {
  getDetailUser: async (handle: string) => {
    const user = await usersRepository.findByEmailOrHandle(handle);
    if (!user) throw new ErrorResponse("User not found.", 404);
    return user;
  },
};

export default usersService;
