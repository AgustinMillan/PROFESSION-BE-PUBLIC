import { z } from "zod";
import {
  ProfessionalDetailMap,
  ProfessionalMap,
} from "./mapers/professional.map";

export const CreateProfessionalSchema = z.object({
  userId: z.string(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("El email debe ser valido"),
  phone: z.string(),
  category: z.string(),
  description: z.string(),
  isActive: z.boolean().optional().default(true),
  pricePerQuote: z.number().default(0),
  image: z.string().optional(),
});
export type CreateProfessionalDTO = z.infer<typeof CreateProfessionalSchema>;

export const FindProfessionalsSchema = z.object({
  page: z
    .string()
    .transform((val) => Number(val))
    .default("1"),
});
export type FindProfessionalsDTO = z.infer<typeof FindProfessionalsSchema>;

export const UpdateProfessionalSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  phone: z.string(),
  category: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  pricePerQuote: z.number().optional(),
  image: z.string().optional(),
});
export type UpdateProfessionalDto = z.infer<typeof UpdateProfessionalSchema>;

export type FindAllProfessionalsResponse = {
  page: number;
  total: number;
  data: ProfessionalMap[];
};

export type ProfessionalResponse = ProfessionalDetailMap;
