import { VerifyAuthUseCase } from "@/core/use-cases/VerifyAuth";
import { JWTJoseImp } from "@/infrastructure/auth/JWTJoseImp";

export class VerifyAuthUseCaseFactory {
  static make() {
    return new VerifyAuthUseCase(new JWTJoseImp());
  }
}
