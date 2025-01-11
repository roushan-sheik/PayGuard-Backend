//* eslint-disable @typescript-eslint/no-this-alias */
//* eslint-disable prefer-const */
import mongoose, { Schema, model } from "mongoose";
import { TDocument } from "./document.interface";
import { DocumentStatus } from "./document.constant";

const documentSchema = new Schema<TDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: {
    type: String,
  },
  status: {
    enum: Object.keys(DocumentStatus),
    default: DocumentStatus.PENDING,
  },
  uploadedAt: { type: Date, default: Date.now },
});

const Document = model<TDocument>("Document", documentSchema);

export default Document;
