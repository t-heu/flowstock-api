import { z } from "zod";

export const MovementSchema = z.object({
  product_department: z.string()
    .trim()
    .min(1, "Departamento obrigatório")
    .max(64, "Departamento muito grande"),

  product_id: z.string()
    .uuid("product_id inválido"),

  branch_id: z.string()
    .uuid("branch_id inválido"),

  destination_branch_id: z.string()
    .uuid("destination_branch_id inválido")
    .nullable()
    .optional()
    .transform(v => v ?? null),

  quantity: z.number()
    .int("Quantidade deve ser um número inteiro")
    .min(1, "Quantidade mínima é 1")
    .max(999999, "Quantidade muito grande"),

  type: z.enum(["entrada", "saida"])
    .refine(val => ["entrada", "saida"].includes(val), {
      message: "Tipo deve ser 'entrada' ou 'saida'",
    }),

  notes: z.string()
    .trim()
    .max(500, "Notas muito longas")
    .optional(),

  invoice_number: z.string()
    .trim()
    .max(64, "Número de nota muito longo")
    .optional(),
});
