import express from "express";
import { userController } from "./user.controller";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router
  .route("/register")
  .post(
    zodValidateRequest(UserValidation.createUserValidationSchema),
    userController.createUser
  );

export default router;
