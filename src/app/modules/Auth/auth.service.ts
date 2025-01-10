/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret } from "jsonwebtoken";
import status from "http-status";
import ApiError from "../../utils/ApiError";
import User from "../User/user.model";
import { isPasswordMatched } from "./auth.utils";
import config from "../../../config";

// Register user
const loginUser = async (payload: any) => {
  // check user
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found!");
  }

  //   check password
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );
  if (!passwordMatch) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }
  //   generate a access token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    {
      expiresIn: config.jwt.access_token_expiration,
    }
  );
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt.refresh_token_secret as Secret,
    {
      expiresIn: config.jwt.refresh_token_expiration,
    }
  );
  return {
    accessToken,
    refreshToken,
  };
};

// Logout user
const logOutUser = async (refreshToken: string) => {
  // decode token
  const decodedData: JwtPayload | null = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.refresh_token_secret as string
  );
  return {
    message: "Log out Successfully",
  };
};

export const authService = {
  loginUser,
  logOutUser,
};
