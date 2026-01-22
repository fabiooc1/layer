import { JWTGateway, JWTPayload } from "@/core/gateways/JWTGateway";
import { SignJWT, jwtVerify } from "jose";

export class JWTJoseImp implements JWTGateway {
  private secret: Uint8Array;

  constructor() {
    this.secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
  }

  async generateToken(
    payload: JWTPayload,
    expiresIn: string | number = "1d",
  ): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(this.secret);
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload as JWTPayload;
  }
}
