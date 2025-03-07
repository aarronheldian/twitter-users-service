import { Document, Types } from "mongoose";

export interface IFollow {
  follower: Types.ObjectId;
  following: Types.ObjectId;
}

export interface IRequestFollow {
  follower: string;
  following: string;
}

export interface IRequestGetListFollows {
  follower?: string;
  following?: string;
}

export interface IRequestGetListFollowers {
  following: string;
}

export interface IFollowDocument extends IFollow, Document {}
