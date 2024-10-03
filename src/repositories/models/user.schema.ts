import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../../interfaces/user.types";

const userSchema = new Schema({
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
      /^@[\w]{1,31}$/, // Ensures the handle starts with @ and is 2-32 characters long
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
      "Please add a valid e-mail",
    ],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minLength: [8, "Password must have at least 8 characters"],
  },
  profilePicture: {
    alt: String,
    url: String,
  },
  banner: {
    alt: String,
    url: String,
  },
  followers: [Schema.Types.ObjectId],
  following: [Schema.Types.ObjectId],
  birthDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Index for optimizing search on email and handle
userSchema.index({ email: 1, handle: 1 });

// Update `updatedAt` field on save
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = model<IUserDocument>("User", userSchema);

export default UserModel;
