import jwt from "jsonwebtoken";
import { config } from "../config";
import { LoginDto, LoginResponse, loginSchema } from "../common/dtos/auth.dto";
import { getOneUserSystem } from "./user.service";
import { comparePassword } from "../common/helpers";
import { CustomError } from "../middlewares/error.handler";
import { logError } from "../common/helpers/logger.helper";
import Auth from "../models/auth.model";

const SECRET_KEY = config.JWT_SECRET;

const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = async (token: string): Promise<any> => {
  try {
    const auth = await Auth.findOne({ token }).lean().exec();
    const test = jwt.verify(auth?.token || "", SECRET_KEY);

    return test;
  } catch (error) {
    return false;
  }
};

const login = async (body: unknown): Promise<LoginResponse> => {
  const validatedData = <LoginDto>loginSchema.parse(body);
  const { email, password } = validatedData;

  try {
    const user = await getOneUserSystem({ email });

    const compare = comparePassword(password, user.password);

    if (!compare) {
      throw new CustomError("Contraseña incorrecta", 401, "");
    }
    const token = generateToken({ userId: user.id, role: user.role.type });

    await Auth.deleteMany({ user: user.id.toString() });
    await Auth.create({ token, user: user.email });

    return { token };
  } catch (error) {
    logError(login.name, error);
    throw error;
  }
};

export { verifyToken, login };
