import { Schema, Types, model } from "mongoose";
import { REFERENCES } from "../common/constants";

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: Types.ObjectId,
    ref: REFERENCES.ROLE,
    required: true,
  },
  phone: { type: String },
  location: { type: String }, // Puede ser una ciudad o coordenadas
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", UserSchema);

export default User;
