import { Document, Types } from "mongoose";

export interface IFollow {
  follower: Types.ObjectId;
  following: Types.ObjectId;
}

export interface IRequestFollow {
  follower: Types.ObjectId | string | unknown;
  following: Types.ObjectId | string | unknown;
}

export interface IFollowDocument extends IFollow, Document {}
