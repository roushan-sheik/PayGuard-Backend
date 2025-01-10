import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// middlewares for parsing incoming requests
const corseOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corseOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send("PayGuard Home");
});

export { app };
