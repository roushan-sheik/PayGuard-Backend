/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ICustomGlobalError } from "../interface/error.interface";
import status from "http-status";
import config from "../../config";

import GlobalErrorObj from "../utils/GlobalErrorObj";
import {
  handleValidationError,
  handleCastError,
  handleDuplicateError,
  handleZodError,
} from "../errors";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  //? <====================|| Handle ApiError ||===================>
  let customGlobalError: ICustomGlobalError = {
    success: err.success || false,
    statusCode: err.statusCode || status.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error!!",
    errorSources: [
      {
        path: "",
        message: err.message || "Something went wrong!",
      },
    ],
  };

  //? <====================|| Handle All The Errors ||===================>
  if (err.name === "ValidationError") {
    customGlobalError = handleValidationError(err);
  } else if (err?.name === "CastError") {
    customGlobalError = handleCastError(err);
  } else if (err?.code === 11000) {
    customGlobalError = handleDuplicateError(err)!;
  } else if (err?.name === "ZodError") {
    customGlobalError = handleZodError(err);
  } else if (err instanceof Error) {
    customGlobalError = new GlobalErrorObj(
      500,
      err?.message || customGlobalError.message,
      customGlobalError.errorSources
    );
  }
  //? <====================|| finally send the response ||===================>
  res.status(customGlobalError.statusCode).json({
    success: customGlobalError.success,
    message: customGlobalError.message,
    errorSources: customGlobalError.errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};
export default globalErrorHandler;
