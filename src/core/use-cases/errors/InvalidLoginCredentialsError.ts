export class InvalidLoginCredentialsError extends Error {
  constructor() {
    super("Invalid login credentials.");
    this.name = "InvalidLoginCredentialsError";
  }
}
