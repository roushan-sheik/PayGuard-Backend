import express from "express";

const router = express.Router();

router.route("/").post();

export const authRoutes = router;
