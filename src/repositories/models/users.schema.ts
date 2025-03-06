import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../../interfaces/users.types";

const usersSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxLength: 64,
    },
    handle: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Handle is required"],
      match: [
        /^@[\w]{1,31}$/, // Ensures handle starts with @ and is 2-32 characters long
        "Handle must start with @ and contain only letters, numbers, and underscores (max 32 characters)",
      ],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minLength: [8, "Password must have at least 8 characters"],
    },
    profilePicture: {
      type: new Schema({ alt: String, url: String }, { _id: false }),
      default: { alt: "", url: "" },
    },
    banner: {
      type: new Schema({ alt: String, url: String }, { _id: false }),
      default: { alt: "", url: "" },
    },
    birthDate: { type: Date },
  },
  { timestamps: true }
);

usersSchema.index({ email: 1, handle: 1 }, { unique: true });

usersSchema.pre("save", async function (next) {
  const user = this as IUserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

usersSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UsersModel = model<IUserDocument>("Users", usersSchema);
export default UsersModel;
