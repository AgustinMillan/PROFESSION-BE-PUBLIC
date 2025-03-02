import { z } from "zod";
import { ERoles } from "../constants";
import { RoleMap } from "./mapers/role.map";

const roleValues = Object.values(ERoles) as [ERoles, ...ERoles[]];

export const CreateRoleSchema = z.object({
  type: z.enum(roleValues, {
    errorMap: () => ({
      message: "El rol debe ser 'client', 'professional' o 'admin'",
    }),
  }),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});
export type CreateRoleDTO = z.infer<typeof CreateRoleSchema>;

export const UpdateRoleSchema = z.object({
  type: z
    .enum(roleValues, {
      errorMap: () => ({
        message: "El rol debe ser 'client', 'professional' o 'admin'",
      }),
    })
    .optional(),
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
});
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;

export type RoleResponse = RoleMap[];
