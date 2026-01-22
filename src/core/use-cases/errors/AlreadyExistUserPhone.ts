export class AlreadyExistsUserPhone extends Error {
  constructor() {
    super("Phone number already in use");
  }
}
