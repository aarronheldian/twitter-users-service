import { IRequestFollow } from "@/interfaces/follows.types";
import { IPagination } from "@/interfaces/list.types";
import FollowsModel from "@/repositories/models/follow.schema";

const followsRepository = {
  insert: async (data: IRequestFollow) => {
    const follow = new FollowsModel({
      follower: data.follower,
      following: data.following,
    });
    const newFollow = await follow.save();
    return newFollow;
  },
  delete: async (filter: IRequestFollow) => {
    return FollowsModel.findOneAndDelete(filter);
  },
  findFollowers: async (userId: string, { page, limit }: IPagination) => {
    return FollowsModel.find({ following: userId })
      .populate({
        path: "follower",
        select: "fullName handle profilePicture",
      })
      .skip((page - 1) * limit)
      .limit(limit);
  },
  findFollowings: async (userId: string, { page, limit }: IPagination) => {
    return FollowsModel.find({ follower: userId })
      .populate({
        path: "following",
        select: "fullName handle profilePicture",
      })
      .skip((page - 1) * limit)
      .limit(limit);
  },
};

export default followsRepository;
