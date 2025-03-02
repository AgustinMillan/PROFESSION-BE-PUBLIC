import { Schema, model } from "mongoose";
import { ERoles } from "../common/constants";

const RoleSchema = new Schema({
  type: { type: String, enum: Object.values(ERoles), required: true },
  name: { type: String, required: true },
});

const Role = model("Role", RoleSchema);

export default Role;
