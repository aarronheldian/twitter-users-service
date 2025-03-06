import { Document } from "mongoose";

export interface IRequestRegister {
  fullName: string;
  handle: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IAuth {
  sub: string;
  iss: string;
  refreshToken: string;
}

export interface IAuthDocument extends IAuth, Document {}
