import { model, Schema } from "mongoose";
import { IAuthDocument } from "../../interfaces/auth.types";

const authSchema = new Schema({
  sub: {
    type: String,
    trim: true,
    required: [true, "sub is required"],
    unique: true,
  },
  iss: {
    type: String,
    trim: true,
    required: [true, "iss is required"],
    unique: true,
  },
  refreshToken: {
    type: String,
    trim: true,
    required: [true, "Refresh Token is required"],
  },
});

const AuthModel = model<IAuthDocument>("Auth", authSchema);

export default AuthModel;
