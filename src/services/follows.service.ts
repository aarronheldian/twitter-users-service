import followsRepository from "@/repositories/follows.repository";
import { IRequestFollow } from "@/interfaces/follows.types";
import usersRepository from "@/repositories/users.repository";
import ErrorResponse from "@/utils/errorResponse";
import { IPagination } from "@/interfaces/list.types";
import { StatusCodes } from "http-status-codes";

const followsService = {
  followUser: async (follower: string, following: string) => {
    const followingData = await usersRepository.findById(following);
    if (!followingData)
      throw new ErrorResponse("User not found.", StatusCodes.NOT_FOUND);

    const data: IRequestFollow = {
      follower: follower,
      following: followingData._id as string,
    };
    const follow = await followsRepository.insert(data);
    return follow;
  },
  unfollowUser: async (follower: string, following: string) => {
    const followingData = await usersRepository.findById(following);
    if (!followingData)
      throw new ErrorResponse("User not found.", StatusCodes.NOT_FOUND);

    const data: IRequestFollow = {
      follower: follower,
      following: followingData._id as string,
    };
    const follow = await followsRepository.delete(data);
    return follow;
  },
  getListFollowers: async (userId: string, options: IPagination) => {
    const userData = await usersRepository.findById(userId);
    if (!userData)
      throw new ErrorResponse("User not found.", StatusCodes.NOT_FOUND);

    const followers = await followsRepository.findFollowers(userId, options);

    const normalizeFollowers = followers.map(({ follower }) => follower);

    return normalizeFollowers;
  },
  getListFollowings: async (userId: string, options: IPagination) => {
    const userData = await usersRepository.findById(userId);
    if (!userData)
      throw new ErrorResponse("User not found.", StatusCodes.NOT_FOUND);

    const followings = await followsRepository.findFollowings(userId, options);

    const normalizeFollowings = followings.map(({ following }) => following);

    return normalizeFollowings;
  },
};

export default followsService;
