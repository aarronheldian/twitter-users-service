import jwt from "jsonwebtoken";
import { IUser, IUserDocument } from "../interfaces/users.types";
import {
  IAuth,
  IRequestLogin,
  IRequestRegister,
} from "../interfaces/auths.types";
import ErrorResponse from "../utils/errorResponse";
import env from "../utils/env";
import authsRepository from "../repositories/auths.repository";
import usersRepository from "../repositories/users.repository";

const authService = {
  register: async (payload: IRequestRegister) => {
    const { fullName, handle, email, password, birthDate } = payload;
    const data: IUser = {
      fullName,
      handle,
      email,
      password,
      profilePicture: {
        alt: "",
        url: "",
      },
      birthDate: new Date(birthDate),
      banner: {
        alt: "",
        url: "",
      },
    };
    const user = await usersRepository.insert(data);
    return user;
  },
  login: async (payload: IRequestLogin) => {
    const { email, password } = payload;
    const user = await usersRepository.findByEmailOrHandle(email, {
      password: 1,
    });
    if (!user) throw new ErrorResponse("User not found.", 404);
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
      throw new ErrorResponse("Invalid credentials.", 400);
    return user;
  },
  generateToken: async (
    user: IUserDocument,
    secretKey: string,
    tokenLifetime: number
  ) => {
    const token = jwt.sign(
      {
        sub: user.id,
        iss: env.ISSUER,
      },
      secretKey,
      {
        expiresIn: tokenLifetime,
        algorithm: "HS256",
      }
    );

    return token;
  },
  storeRefreshToken: async (user: IUserDocument, token: string) => {
    const existingToken = await authsRepository.findByUserId(user.id);
    if (existingToken) {
      await authsRepository.updateByUserId(user.id, token);
    } else {
      const data: IAuth = {
        sub: user.id,
        refreshToken: token,
        iss: env.ISSUER,
      };
      await authsRepository.insert(data);
    }
  },
  verifyToken: async (token: string, secret: string) => {
    return jwt.verify(token, secret, { issuer: env.ISSUER }) as IAuth;
  },
  verifyRefreshTokenExist: async (refreshToken: string) => {
    const activeRefreshToken = await authsRepository.findByRefrehToken(
      refreshToken
    );
    if (!activeRefreshToken)
      throw new ErrorResponse("Invalid token. Please log in again.", 401);
    return activeRefreshToken;
  },
};

export default authService;
