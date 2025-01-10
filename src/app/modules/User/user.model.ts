/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-const */
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../../config";

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
      required: [true, "Role is required"],
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.USER,
    },
  },
  { timestamps: true }
);

// password hash method
userSchema.pre("save", async function (next) {
  let user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt)
  );
  next();
});

const User = model<TUser>("User", userSchema);

export default User;