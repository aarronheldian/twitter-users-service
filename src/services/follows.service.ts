import followsRepository from "@/repositories/follows.repository";
import {
  IRequestFollow,
  IRequestGetListFollows,
} from "@/interfaces/follows.types";
import usersRepository from "@/repositories/users.repository";
import ErrorResponse from "@/utils/errorResponse";

const followsService = {
  followUser: async (follower: string, following: string) => {
    const followingData = await usersRepository.findById(following);
    if (!followingData) throw new ErrorResponse("User not found.", 404);

    const data: IRequestFollow = {
      follower: follower,
      following: followingData._id as string,
    };
    const follow = await followsRepository.insert(data);
    return follow;
  },
  unfollowUser: async (follower: string, following: string) => {
    const followingData = await usersRepository.findById(following);
    if (!followingData) throw new ErrorResponse("User not found.", 404);

    const data: IRequestFollow = {
      follower: follower,
      following: followingData._id as string,
    };
    const follow = await followsRepository.delete(data);
    return follow;
  },
  getListFollows: async ({ follower, following }: IRequestGetListFollows) => {
    if (follower) {
      const followerData = await usersRepository.findById(follower);
      if (!followerData) throw new ErrorResponse("User not found.", 404);
    }

    if (following) {
      const followingData = await usersRepository.findById(following);
      if (!followingData) throw new ErrorResponse("User not found.", 404);
    }

    let filter: IRequestGetListFollows = {};
    if (follower) filter.follower = follower;
    if (following) filter.following = following;

    const follows = await followsRepository.find(filter);

    return follows;
  },
};

export default followsService;
