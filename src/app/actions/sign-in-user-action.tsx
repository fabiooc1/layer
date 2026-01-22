"use server";

import { SignInUserUseCaseFactory } from "@/factories/SignInUserUseCaseFactory";
import {
  SignInFormData,
  signInFormSchema,
} from "../schemas/sign-in-form-schema";
import { setAuthCookies } from "@/lib/set-auth-cookies";
import { InvalidLoginCredentialsError } from "@/core/use-cases/errors/InvalidLoginCredentialsError";
import { keys } from "@/mapping/errorKeys";

export async function signInUserAction(formData: SignInFormData) {
  const parsedData = await signInFormSchema.parseAsync(formData);
  const signInUserUseCase = SignInUserUseCaseFactory.make();

  try {
    const token = await signInUserUseCase.execute(
      parsedData.login,
      parsedData.password,
    );

    await setAuthCookies(token);
  } catch (error) {
    if (error instanceof InvalidLoginCredentialsError) {
      throw new Error(keys.INVALID_CREDENTIALS);
    }

    throw error;
  }
}
