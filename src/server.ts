/* eslint-disable no-console */
import { app } from "./app";
import config from "./config";
import connectDB from "./db/connectDB";

const main = () => {
  connectDB()
    .then(() => {
      app.listen(config.port, () => {
        console.log(
          `\n App is running on port: http://localhost:${config.port}`
        );
      });
    })
    .catch((error) => {
      console.log("MongoDB Connection FAILED!", error.message);
    });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
};
main();
export default main;
