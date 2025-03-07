import { model, Schema } from "mongoose";
import { IFollowDocument } from "@/interfaces/follows.types";

const followsSchema = new Schema<IFollowDocument>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: [true, "Follower Id is required"],
      ref: "Users",
    },
    following: {
      type: Schema.Types.ObjectId,
      required: [true, "Following Id is required"],
      ref: "Users",
    },
  },
  { timestamps: true }
);

followsSchema.index({ follower: 1, following: 1 }, { unique: true });

const FollowsModel = model<IFollowDocument>("Follows", followsSchema);

export default FollowsModel;
