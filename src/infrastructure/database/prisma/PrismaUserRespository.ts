import { UserEntity } from "@/core/entities/User";
import { UserRepository } from "@/core/repositories/UserRepository";
import { prisma } from "../prisma";

export class PrismaUserRepository implements UserRepository {
  async existsById(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !!user;
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { cpf },
      select: { id: true },
    });
    return !!user;
  }

  async existsByPhone(phone: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: { phone },
      select: { id: true },
    });
    return !!user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new UserEntity({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new UserEntity({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async create(
    fullName: string,
    email: string,
    cpf: string,
    phone: string,
    passwordHash: string,
  ): Promise<UserEntity> {
    const userData = await prisma.user.create({
      data: {
        fullName,
        email,
        cpf,
        phone,
        passwordHash,
      },
    });

    return new UserEntity({
      id: userData.id,
      fullName: userData.fullName,
      email: userData.email,
      passwordHash: userData.passwordHash,
      cpf: userData.cpf,
      phone: userData.phone,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  }
}
