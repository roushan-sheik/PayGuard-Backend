import { DocumentStatus } from "./document.constant";

export type TDocument = {
  userId: string;
  fileUrl: string;
  status: keyof typeof DocumentStatus;
};
