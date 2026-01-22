export class UserEntity {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.cpf = props.cpf;
    this.phone = props.phone;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
