import { z } from "zod";

const envSchema = z.object({
  /* Empty for now, will be filled in later */
});

export const env = envSchema.parse(process.env);
