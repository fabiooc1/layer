export class AlreadyExistUserCpf extends Error {
  constructor() {
    super("CPF already in use");
  }
}
