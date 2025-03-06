import { Document } from "mongoose";

export interface IUser {
  fullName: string;
  handle: string;
  email: string;
  password: string;
  profilePicture: {
    alt: string;
    url: string;
  };
  banner: {
    alt: string;
    url: string;
  };
  birthDate: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
