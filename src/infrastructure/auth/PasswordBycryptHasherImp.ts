import { PasswordHasherGateway } from "@/core/gateways/PasswordHasherGateway";
import bcrypt from "bcrypt";

export class PasswordBycryptHasherImp implements PasswordHasherGateway {
  private readonly SALTS_ROUNDS = 10;

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALTS_ROUNDS);
  }
}
