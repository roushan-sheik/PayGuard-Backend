//* eslint-disable no-undef */
//* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import status from "http-status";
import ApiError from "../../utils/ApiError";
import User from "../User/user.model";
import { isPasswordMatched } from "./auth.utils";

import config from "../../../config";
import { jwtHelpers } from "../../../helper/jwtHelper";

// Login user
const loginUser = async (payload: { email: string; password: string }) => {
  // Check if the user exists
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found!");
  }

  // Check if the password matches
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }

  // Generate access token
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

  // Generate refresh token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt.refresh_token_secret as Secret,
    {
      expiresIn: config.jwt.refresh_token_expiration,
    }
  );

  // Update refreshToken in the database
  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};

// Logout user
const logOutUser = async (refreshToken: string) => {
  // Decode token
  const decodedData: JwtPayload | null = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.refresh_token_secret as string
  );

  // Check if the token is valid and the user exists
  if (!decodedData || !decodedData.email) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findOne({ email: decodedData.email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Remove the refreshToken
  user.refreshToken = undefined; // Or null if preferred
  await user.save();

  return {
    message: "Log out successfully",
  };
};

export const authService = {
  loginUser,
  logOutUser,
};
