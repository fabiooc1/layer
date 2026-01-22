"use server";

import { UserNotFoundError } from "@/core/use-cases/errors/UserNotFoundError";
import { GetUserUseCaseFactory } from "@/factories/GetUserUseCaseFactory";
import { VerifyAuthUseCaseFactory } from "@/factories/VerifyAuthUseCaseFactory";
import { authAction } from "@/lib/auth-action";
import { keys } from "@/mapping/errorKeys";

export const getUserAction = async (userId: string) => {
  try {
    const useCase = GetUserUseCaseFactory.make();
    return useCase.execute(userId);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new Error(keys.USER_NOT_FOUND);
    }
  }
};
