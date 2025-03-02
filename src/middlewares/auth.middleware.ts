import { Response, NextFunction, Request } from "express";
import { verifyToken } from "../services/auth.service";
import { CustomError } from "./error.handler";

type TToken = {
  user: string;
  role: string;
};

interface RequestCustom extends Request {
  user?: TToken;
  permission?: string[];
}

export const authMiddleware = (roles?: string[]) => {
  return async (
    req: RequestCustom,
    _res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) throw new CustomError("Acceso denegado", 403, "");

      const decoded = await verifyToken(token);

      if (!decoded) throw new CustomError("Token inválido", 403, "");

      if (!roles?.includes(decoded.role)) {
        throw new CustomError("Permisos insuficientes", 403, "");
      }

      req.user = decoded; // Asignamos el usuario al req
      next();
    } catch (error) {
      next(error); // Enviar el error al siguiente middleware
    }
  };
};
