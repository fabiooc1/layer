import { z } from "zod";

export const signUpFormSchema = z
  .object({
    fullName: z.string().min(1, "Insira seu nome completo"),
    email: z.string().min(1, "Insira seu e-mail").email("E-mail inválido"),
    cpf: z.string().min(1, "Insira seu CPF").min(11, "CPF inválido"),
    phone: z
      .string()
      .min(1, "Insira seu telefone")
      .min(10, "Telefone inválido"),
    password: z
      .string()
      .min(1, "Insira sua senha")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    passwordConfirmation: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
