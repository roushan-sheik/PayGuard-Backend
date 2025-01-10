import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { authService } from "./auth.service";

// Auth Controller
const registerUser = AsyncHandler(async (req: Request, res: Response) => {
  // check user credentials
  const result = await authService.registerUser(req.body);
});

export const authController = {
  registerUser,
};
