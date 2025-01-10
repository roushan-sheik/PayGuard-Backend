//* eslint-disable @typescript-eslint/no-explicit-any

import status from "http-status";
import ApiError from "../../utils/ApiError";
import { TUser } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: TUser) => {
  // find the user into db
  const isUserExists = await User.find({ email: payload.email });
  if (isUserExists) {
    throw new ApiError(status.CONFLICT, "User already Exists");
  }

  const user = await User.create(payload);
  return user;
};

export const userService = {
  createUser,
};
