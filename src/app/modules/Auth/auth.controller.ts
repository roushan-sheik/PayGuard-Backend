import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { authService } from "./auth.service";
import status from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import config from "../../../config";

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

export const authController = {
  loginUser,
};
