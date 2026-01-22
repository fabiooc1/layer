import { UserEntity } from "../entities/User";
import { JWTGateway, JWTPayload } from "../gateways/JWTGateway";
import { UnauthorizedError } from "./errors/UnauthorizedError";

export interface VerifyAuthUseCaseOutput {
  user: JWTPayload;
}

export class VerifyAuthUseCase {
  private JwtService: JWTGateway;

  public constructor(jwtService: JWTGateway) {
    this.JwtService = jwtService;
  }

  async execute(token: string): Promise<VerifyAuthUseCaseOutput> {
    try {
      const payload: JWTPayload = await this.JwtService.verifyToken(token);
      console.log(payload);
      return { user: payload };
    } catch {
      throw new UnauthorizedError();
    }
  }
}
