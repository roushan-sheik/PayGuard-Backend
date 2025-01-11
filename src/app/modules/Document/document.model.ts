//* eslint-disable @typescript-eslint/no-this-alias */
//* eslint-disable prefer-const */
import { Schema, model } from "mongoose";
import { TDocument } from "./document.interface";
import { DocumentStatus } from "./document.constant";

const documentSchema = new Schema<TDocument>(
  {
    userId: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    status: {
      enum: Object.keys(DocumentStatus),
      default: DocumentStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Document = model<TDocument>("Document", documentSchema);

export default Document;
