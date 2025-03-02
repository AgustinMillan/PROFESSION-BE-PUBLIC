import { Schema, model } from "mongoose";

const ServiceRequestSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "canceled"],
    default: "pending",
  },
  scheduledDate: { type: Date, required: true },
  proofImages: [{ type: String }], // URLs de imágenes de trabajo completado
  createdAt: { type: Date, default: Date.now },
});

const ServiceRequest = model("ServiceRequest", ServiceRequestSchema);

export default ServiceRequest;
