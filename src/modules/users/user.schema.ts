import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Nome obrigatório")
    .max(100, "Nome muito grande"),

  username: z.string()
    .trim()
    .min(3, "Username deve ter ao menos 3 caracteres")
    .max(50, "Username muito grande"),

  email: z.string()
    .trim()
    .email("Email inválido")
    .max(120),

  role: z.enum(["admin", "operator", "manager"])
    .default("operator"),

  department: z.string()
    .trim()
    .min(1, "Departamento obrigatório")
    .max(64, "Departamento muito grande")
    .transform(v => v.trim()),

  branchId: z.string()
    .uuid("branchId inválido"),
});

export const updateUserSchema = createUserSchema
  .partial()
  .extend({
    password: z.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(128)
      .optional(),
  });
