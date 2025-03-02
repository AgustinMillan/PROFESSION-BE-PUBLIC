import { z } from "zod";
import { UserDetailMap, UserMap } from "./mapers/user.map";
import { existRole } from "../../services/role.service";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  email: z.string().email("El email debe ser valido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula")
    .regex(/\d/, "La contraseña debe incluir al menos un número"),
  role: z.string().refine(async (id) => await existRole(id), {
    message: "El rol no es válido",
  }),
  phone: z.string(),
  location: z.string(),
});
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const FindUsersSchema = z.object({
  page: z
    .string()
    .transform((val) => Number(val))
    .default("1"),
});
export type FindUsersDTO = z.infer<typeof FindUsersSchema>;

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  lastName: z
    .string()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .optional(),
  email: z.string().email("El email debe ser valido").optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export type FindAllUsersResponse = {
  page: number;
  total: number;
  data: UserMap[];
};

export type UserResponse = UserDetailMap;
