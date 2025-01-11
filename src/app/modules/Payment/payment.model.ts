//* eslint-disable @typescript-eslint/no-this-alias */
//* eslint-disable prefer-const */
import mongoose, { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";
import { PaymentStatus } from "./payment.constant";

const paymentSchema = new Schema<TPayment>(
  {
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      enum: Object.keys(PaymentStatus),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = model<TPayment>("Payment", paymentSchema);

export default Payment;
