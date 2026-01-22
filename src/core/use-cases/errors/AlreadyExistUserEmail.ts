export class AlreadyExistsUserEmail extends Error {
  constructor() {
    super("Email already in use");
  }
}
