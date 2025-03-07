import {
  IRequestFollow,
  IRequestGetListFollows,
} from "@/interfaces/follows.types";
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
  find: async (filter: IRequestGetListFollows) => {
    return FollowsModel.find(filter)
      .populate({
        path: "follower",
        select: "fullName handle profilePicture",
      })
      .populate({
        path: "following",
        select: "fullName handle profilePicture",
      });
  },
};

export default followsRepository;
