import { z } from "zod";
import dotenv from "dotenv";
import packageJson from "../package.json";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VERSION: z.string().default(packageJson.version),
  PROJECT_NAME: z.string().default(packageJson.name),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
});

// Valida las variables de entorno
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  process.exit(1);
}

export const config = env.data;
