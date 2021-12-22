export class Login {
  constructor(private _email: string, private _senha: string) {}

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  set senha(senha: string) {
    this._senha = senha;
  }

  get senha() {
    return this._senha;
  }
}
