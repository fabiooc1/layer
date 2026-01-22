import { UserRepository } from "../repositories/UserRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";

export class GetUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
