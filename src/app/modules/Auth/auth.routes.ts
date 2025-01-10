import express from "express";
import { authController } from "./auth.controller";
import { zodValidateRequest } from "../../middlewares";
import { UserValidation } from "../User/user.validation";

const router = express.Router();

router
  .route("/login")
  .post(
    zodValidateRequest(UserValidation.createUserValidationSchema),
    authController.loginUser
  );

export default router;
