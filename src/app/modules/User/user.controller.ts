import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { userService } from "./user.service";
import status from "http-status";
import ApiResponse from "../../utils/ApiResponse";

const createUser = AsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res
    .status(status.CREATED)
    .json(
      new ApiResponse(status.CREATED, result, "User is created Successfully")
    );
});

export const userController = {
  createUser,
};
