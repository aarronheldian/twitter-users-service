import { IRequestFollow } from "../interfaces/follows.types";
import FollowsModel from "./models/follow.schema";

const followsRepository = {
  insert: async ({ follower, following }: IRequestFollow) => {
    const follows = new FollowsModel({
      follower,
      following,
    });
    await follows.save();
  },
};

export default followsRepository;
