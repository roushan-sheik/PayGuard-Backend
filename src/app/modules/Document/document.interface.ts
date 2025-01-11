import mongoose from "mongoose";
import { DocumentStatus } from "./document.constant";

export type TDocument = {
  userId: mongoose.Types.ObjectId;
  fileUrl: string;
  status: keyof typeof DocumentStatus;
  uploadedAt: Date;
};
