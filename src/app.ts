import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

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
// App Routes =======================>
import appRoute from "./app/routes";
app.use("/api/v1", appRoute);

// not found middleware and globalErrorHandler
import { globalErrorHandler, notFound } from "./app/middlewares";
app.use(notFound);
app.use(globalErrorHandler);

export { app };
