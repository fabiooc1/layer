import { CreateUserUseCase } from "@/core/use-cases/CreateUser";
import { JWTJoseImp } from "@/infrastructure/auth/JWTJoseImp";
import { PasswordBycryptHasherImp } from "@/infrastructure/auth/PasswordBycryptHasherImp";
import { PrismaUserRepository } from "@/infrastructure/database/prisma/PrismaUserRespository";

export class CreateUserUseCaseFactory {
  static make() {
    return new CreateUserUseCase(
      new PrismaUserRepository(),
      new PasswordBycryptHasherImp(),
      new JWTJoseImp(),
    );
  }
}
