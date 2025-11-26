import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string()
    .trim()
    .min(1, "Username é obrigatório")
    .max(80, "Username muito longo"),

  password: z.string()
    .min(1, "Senha é obrigatória")
    .max(120, "Senha muito longa"),
});
