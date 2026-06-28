import { z } from "zod";

const envSchema = z.object({
  SITE_DOMAIN: z.string().min(1).default("raceatlas.moritzwieland.de"),
  DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);
