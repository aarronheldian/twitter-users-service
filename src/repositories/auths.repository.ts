import { IAuth } from "../interfaces/auths.types";
import AuthsModel from "./models/auths.schema";

const authsRepository = {
  insert: async ({ sub, iss, refreshToken }: IAuth) => {
    const auths = new AuthsModel({
      sub,
      iss,
      refreshToken,
    });
    await auths.save();
  },
  findByUserId: async (sub: string) => {
    return AuthsModel.findOne({ sub });
  },
  findByRefrehToken: async (refreshToken: string) => {
    return AuthsModel.findOne({ refreshToken });
  },
  updateByUserId: async (sub: string, refreshToken: string) => {
    return AuthsModel.findOneAndUpdate(
      { sub },
      { refreshToken },
      { new: true }
    );
  },
};

export default authsRepository;
