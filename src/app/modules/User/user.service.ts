/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: TUser) => {
  // find the user into db
  const isUserExists = await User.find({ email: payload.email });
  if(isUserExists){
    throw new 
  }
  const user = await User.create(payload);
  return user;
};

export const userService = {
  createUser,
};
