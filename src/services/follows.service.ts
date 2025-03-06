import followsRepository from "../repositories/follows.repository";
import { IRequestFollow } from "../interfaces/follows.types";
import usersRepository from "../repositories/users.repository";
import ErrorResponse from "../utils/errorResponse";

const followsService = {
  followUser: async (followerId: string, handle: string) => {
    const user = await usersRepository.findByEmailOrHandle(handle);
    if (!user) throw new ErrorResponse("User not found.", 404);

    const data: IRequestFollow = {
      follower: followerId,
      following: user._id,
    };
    const follow = await followsRepository.insert(data);
    return follow;
  },
};

export default followsService;
