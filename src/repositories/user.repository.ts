import { IUser } from "../interfaces/user.types";
import UserModel from "./models/user.schema";

const userRepository = {
  insert: async (data: IUser) => {
    const user = new UserModel({
      fullName: data.fullName,
      handle: data.handle,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
    });
    const newUser = await user.save();
    return newUser;
  },
  findByEmailOrHandle: async (query: string) => {
    const user = await UserModel.findOne({
      $or: [{ email: query }, { handle: query }],
    });
    return user;
  },
  findById: async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  },
};

export default userRepository;
