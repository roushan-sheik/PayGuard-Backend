import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { authService } from "./auth.service";
import status from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import config from "../../../config";
import ApiError from "../../utils/ApiError";

// Auth Controller
const loginUser = AsyncHandler(async (req: Request, res: Response) => {
  // check user credentials
  const { accessToken, refreshToken } = await authService.loginUser(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  res
    .status(status.OK)
    .json(
      new ApiResponse(status.OK, { accessToken }, "User LoggedIn Successfully.")
    );
});
const logOutUser = AsyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) {
    // status 401
    throw new ApiError(401, "You are not authorized");
  }
  await authService.logOutUser(refreshToken);

  // remove refreshToken from the cookie
  res.clearCookie("refreshToken");

  res
    .status(status.OK)
    .json(new ApiResponse(status.OK, {}, "User LogOut Successfully."));
});

export const authController = {
  loginUser,
  logOutUser,
};
