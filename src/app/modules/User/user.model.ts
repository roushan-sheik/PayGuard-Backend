//* eslint-disable @typescript-eslint/no-this-alias */
//* eslint-disable prefer-const */
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.USER,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = model<TUser>("User", userSchema);

export default User;
