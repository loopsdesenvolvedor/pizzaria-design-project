import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(6, { message: "Nome é um campo requerido." }),
    email: z.email({ message: "Formato de e-mail iválido." }),
    password: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),
  }),
});
