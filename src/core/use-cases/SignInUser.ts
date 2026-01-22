import { JWTGateway } from "../gateways/JWTGateway";
import { PasswordHasherGateway } from "../gateways/PasswordHasherGateway";
import { UserRepository } from "../repositories/UserRepository";
import { InternalServerError } from "./errors/InternalServerError";
import { InvalidLoginCredentialsError } from "./errors/InvalidLoginCredentialsError";

export class SignInUserUseCase {
  private jwtService: JWTGateway;
  private passwordHasher: PasswordHasherGateway;
  private userRepository: UserRepository;

  constructor(
    jwtService: JWTGateway,
    passwordHasher: PasswordHasherGateway,
    userRepository: UserRepository,
  ) {
    this.jwtService = jwtService;
    this.passwordHasher = passwordHasher;
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidLoginCredentialsError();
    }

    const isValidPassword = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new InvalidLoginCredentialsError();
    }

    try {
      const token = await this.jwtService.generateToken({
        userId: user.id,
      });

      return token;
    } catch (error) {
      console.error("Error authenticating user: ", error);
      throw new InternalServerError();
    }
  }
}
