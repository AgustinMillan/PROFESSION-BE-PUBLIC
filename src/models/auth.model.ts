import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
  token: { type: String, required: true },
  user: { type: String, required: true },
});

const Auth = model("Auth", AuthSchema);

export default Auth;
