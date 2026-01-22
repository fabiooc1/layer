import { JWTGateway } from "../gateways/JwtGateway";
import { PasswordHasherGateway } from "../gateways/PasswordHasherGateway";
import { UserRepository } from "../repositories/UserRepository";
import { AlreadyExistUserCpf } from "./errors/AlreadyExistUserCpf";
import { AlreadyExistsUserEmail } from "./errors/AlreadyExistUserEmail";
import { AlreadyExistsUserPhone } from "./errors/AlreadyExistUserPhone";

export type CreateUserUseCaseInput = {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  phone: string;
};

export class CreateUserUseCase {
  private userRepository: UserRepository;
  private passwordHasher: PasswordHasherGateway;
  private jwtService: JWTGateway;

  constructor(
    userRepository: UserRepository,
    passwordHasher: PasswordHasherGateway,
    jwtService: JWTGateway,
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
  }

  async execute(input: CreateUserUseCaseInput) {
    await this.validateConflicts(input);

    const passwordHash = await this.passwordHasher.hash(input.password);

    const user = await this.userRepository.create(
      input.fullName,
      input.email,
      input.cpf,
      input.phone,
      passwordHash,
    );

    const token = await this.jwtService.generateToken({ userId: user.id });

    return {
      user,
      token,
    };
  }

  private async validateConflicts(input: CreateUserUseCaseInput) {
    const alreadyExistsEmail = await this.userRepository.existsByEmail(
      input.email,
    );

    if (alreadyExistsEmail) {
      throw new AlreadyExistsUserEmail();
    }

    const alreadyExistsCpf = await this.userRepository.existsByCpf(input.cpf);

    if (alreadyExistsCpf) {
      throw new AlreadyExistUserCpf();
    }

    const alreadyExistsPhone = await this.userRepository.existsByPhone(
      input.phone,
    );

    if (alreadyExistsPhone) {
      throw new AlreadyExistsUserPhone();
    }
  }
}
