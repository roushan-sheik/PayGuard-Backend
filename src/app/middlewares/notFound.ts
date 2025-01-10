import status from "http-status";
import ApiResponse from "../utils/ApiResponse";
import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res) => {
  res
    .status(status.NOT_FOUND)
    .json(new ApiResponse(status.NOT_FOUND, "Not Found"));
};

export default notFound;
