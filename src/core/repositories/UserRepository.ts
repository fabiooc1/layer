import { UserEntity } from "../entities/User";

export interface UserRepository {
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByCpf(cpf: string): Promise<boolean>;
  existsByPhone(phone: string): Promise<boolean>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  create(
    fullName: string,
    email: string,
    cpf: string,
    phone: string,
    passwordHash: string,
  ): Promise<UserEntity>;
}
