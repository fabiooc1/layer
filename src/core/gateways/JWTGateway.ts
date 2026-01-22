export interface JWTPayload {}

export interface JWTGateway {
  generateToken(
    payload: JWTPayload,
    expiresIn?: string | number,
  ): Promise<string>;
  verifyToken(token: string): Promise<JWTPayload>;
}
