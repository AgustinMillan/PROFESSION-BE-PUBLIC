import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
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
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = model("Review", ReviewSchema);

export default Review;
