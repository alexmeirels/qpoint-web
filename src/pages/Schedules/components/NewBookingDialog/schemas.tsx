// src/components/NewBookingDialog/schemas.tsx
import { z } from "zod";

// Regex simples para (11) 99999-9999 ou 11999999999
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const NewBookingSchema = z.object({
  responsibleName: z.string().min(1, "Nome é obrigatório"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido"),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  people: z.number().min(1, "Mínimo 1 pessoa"),
});

// 🔹 Tipo TypeScript inferido automaticamente
export type NewBookingFormData = z.infer<typeof NewBookingSchema>;
