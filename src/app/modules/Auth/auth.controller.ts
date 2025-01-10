import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { authService } from "./auth.service";
import status from "http-status";
import ApiResponse from "../../utils/ApiResponse";

// Auth Controller
const registerUser = AsyncHandler(async (req: Request, res: Response) => {
  // check user credentials
  const result = await authService.registerUser(req.body);
  res
    .status(status.CREATED)
    .json(
      new ApiResponse(status.CREATED, result, "User registered successfully")
    );
});

export const authController = {
  registerUser,
};
