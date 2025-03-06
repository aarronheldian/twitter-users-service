import { ProjectionType } from "mongoose";
import { IUser, IUserDocument } from "../interfaces/users.types";
import UsersModel from "./models/users.schema";

const usersRepository = {
  insert: async (data: IUser) => {
    const user = new UsersModel({
      fullName: data.fullName,
      handle: data.handle,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
    });
    const newUser = await user.save();
    return newUser;
  },
  findByEmailOrHandle: async (
    query: string,
    projection: ProjectionType<IUserDocument> = { password: 0 }
  ) => {
    const user = await UsersModel.findOne(
      {
        $or: [{ email: query }, { handle: query }],
      },
      projection
    );
    return user;
  },
  findById: async (id: string) => {
    const user = await UsersModel.findById(id);
    return user;
  },
};

export default usersRepository;
