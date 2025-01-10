import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.route("/").post(authController.registerUser);

export default router;
