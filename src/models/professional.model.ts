import { Schema, Types, model } from "mongoose";
import { REFERENCES } from "../common/constants";

const ProfessionalSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: REFERENCES.USER,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  category: { type: String, required: true }, // Ej: "electricista", "plomero"
  description: { type: String, required: true },
  ratings: [{ type: Number }], // Lista de calificaciones
  averageRating: { type: Number, default: 0 }, // Calculado
  isActive: { type: Boolean, default: true },
  pricePerQuote: { type: Number, required: true }, // Precio referencial por hora
  image: { type: String },
});

const Professional = model("Professional", ProfessionalSchema);

export default Professional;
