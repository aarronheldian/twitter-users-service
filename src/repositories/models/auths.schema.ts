import { model, Schema } from "mongoose";
import { IAuthDocument } from "../../interfaces/auths.types";

const authsSchema = new Schema<IAuthDocument>(
  {
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
    },
    refreshToken: {
      type: String,
      trim: true,
      required: [true, "Refresh Token is required"],
    },
  },
  { timestamps: true }
);

authsSchema.index({ sub: 1, iss: 1 }, { unique: true });

const AuthsModel = model<IAuthDocument>("Auths", authsSchema);

export default AuthsModel;
