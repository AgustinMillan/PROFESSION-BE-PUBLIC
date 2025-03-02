import { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  serviceRequestId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
  },
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "held", "released", "refunded"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = model("Payment", PaymentSchema);

export default Payment;
