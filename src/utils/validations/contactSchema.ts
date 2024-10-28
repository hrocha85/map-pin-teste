import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  cpf: z
    .string()
    .length(11, "CPF deve ter 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  cep: z
    .string()
    .length(8, "CEP deve ter 8 dígitos")
    .regex(/^\d+$/, "CEP deve conter apenas números"),
  address: z.string().min(1, "Endereço é obrigatório"),
});
