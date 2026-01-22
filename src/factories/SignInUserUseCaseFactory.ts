import { SignInUserUseCase } from "@/core/use-cases/SignInUser";
import { JWTJoseImp } from "@/infrastructure/auth/JWTJoseImp";
import { PasswordBycryptHasherImp } from "@/infrastructure/auth/PasswordBycryptHasherImp";
import { PrismaUserRepository } from "@/infrastructure/database/prisma/PrismaUserRespository";

export class SignInUserUseCaseFactory {
  static make() {
    return new SignInUserUseCase(
      new JWTJoseImp(),
      new PasswordBycryptHasherImp(),
      new PrismaUserRepository(),
    );
  }
}
