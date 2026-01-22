"use server";

import { setAuthCookies } from "@/lib/set-auth-cookies";
import {
  SignUpFormData,
  signUpFormSchema,
} from "../schemas/sign-up-form-schema";
import { CreateUserUseCaseFactory } from "@/factories/CreateUserUseCaseFactory";

export async function createUserAction(formData: SignUpFormData) {
  const formDataParsed = await signUpFormSchema.parseAsync(formData);
  const createUserUseCase = CreateUserUseCaseFactory.make();

  try {
    const data = await createUserUseCase.execute({
      fullName: formDataParsed.fullName,
      email: formDataParsed.email,
      password: formDataParsed.password,
      cpf: formDataParsed.cpf,
      phone: formDataParsed.phone,
    });

    await setAuthCookies(data.token);
  } catch (error) {
    console.error("Error creating user: ", error);
  }
}
