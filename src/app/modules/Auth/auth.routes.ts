import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.route("/register").post(authController.registerUser);

export default router;
