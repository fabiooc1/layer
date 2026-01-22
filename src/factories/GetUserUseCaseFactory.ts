import { GetUserUseCase } from "@/core/use-cases/GetUser";
import { PrismaUserRepository } from "@/infrastructure/database/prisma/PrismaUserRespository";

export class GetUserUseCaseFactory {
  static make() {
    return new GetUserUseCase(new PrismaUserRepository());
  }
}
