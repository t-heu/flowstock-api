import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, "Nome obrigatório e com pelo menos 3 caracteres")
    .max(128, "Nome muito longo")
    .trim(),

  code: z
    .string()
    .min(2, "Código obrigatório e com pelo menos 2 caracteres")
    .max(8, "Código muito longo")
    .trim(),

  description: z
    .string()
    .max(2000, "Descrição muito longa")
    .optional()
    .default("")
    .transform(v => v?.trim() ?? ""),

  unit: z
    .string()
    .min(2, "Unidade obrigatória e com pelo menos 2 caracteres")
    .max(4, "Unidade muito longa")
    .trim(),

  department: z
    .string()
    .min(2, "Departamento obrigatório")
    .max(25, "Departamento muito longo")
    .trim(),
});

// Atualização parcial (PATCH / PUT flexível)
export const ProductUpdateSchema = ProductSchema.partial();
