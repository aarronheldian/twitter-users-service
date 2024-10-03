import { IAuth } from "../interfaces/auth.types";
import AuthModel from "./models/auth.schema";

const authRepository = {
  insert: async ({ sub, iss, refreshToken }: IAuth) => {
    const auth = new AuthModel({
      sub,
      iss,
      refreshToken,
    });
    await auth.save();
  },
  findByUserId: async (sub: string) => {
    return AuthModel.findOne({ sub });
  },
  findByRefrehToken: async (refreshToken: string) => {
    return AuthModel.findOne({ refreshToken });
  },
  updateByUserId: async (sub: string, refreshToken: string) => {
    return AuthModel.findOneAndUpdate({ sub }, { refreshToken }, { new: true });
  },
};

export default authRepository;
