import { z } from "zod";

export const CreateBranchSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Nome é obrigatório e deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),

  code: z.string()
    .trim()
    .min(1, "Código é obrigatório")
    .max(10, "Código muito longo"),
});

export const UpdateBranchSchema = CreateBranchSchema.partial();
