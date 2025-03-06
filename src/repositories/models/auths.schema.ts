import { model, Schema } from "mongoose";
import { IAuthDocument } from "../../interfaces/auths.types";

const authsSchema = new Schema({
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

const AuthsModel = model<IAuthDocument>("Auths", authsSchema);

export default AuthsModel;
