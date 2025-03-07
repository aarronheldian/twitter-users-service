import { IAuth } from "@/interfaces/auths.types";
import AuthsModel from "@/repositories/models/auths.schema";

const authsRepository = {
  insert: async (data: IAuth) => {
    const auths = new AuthsModel({
      sub: data.sub,
      iss: data.iss,
      refreshToken: data.refreshToken,
    });
    await auths.save();
  },
  findByUserId: async (sub: string) => {
    return AuthsModel.findOne({ sub });
  },
  findByRefreshToken: async (refreshToken: string) => {
    return AuthsModel.findOne({ refreshToken });
  },
  updateByUserId: async (sub: string, refreshToken: string) => {
    return AuthsModel.findOneAndUpdate(
      { sub },
      { refreshToken },
      { new: true }
    );
  },
  deleteRefreshToken: async (refreshToken: string) => {
    return AuthsModel.findOneAndDelete({ refreshToken });
  },
};

export default authsRepository;
