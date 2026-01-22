import { z } from "zod";

export const signInFormSchema = z.object({
  login: z.email("Use seu e-mail para entrar"),
  password: z.string().min(1, "Insira sua senha"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
