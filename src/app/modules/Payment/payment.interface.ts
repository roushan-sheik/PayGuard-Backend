import mongoose from "mongoose";
import { PaymentStatus } from "./payment.constant";

export type TPayment = {
  title: string;
  amount: number;
  status: keyof typeof PaymentStatus;
  userId: mongoose.Types.ObjectId;
};
