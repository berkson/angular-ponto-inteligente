export class CadastroPf {
  constructor(
    private _nome: string,
    private _email: string,
    private _senha: string,
    private _cpf: string,
    private _cnpj: string
  ) {}

  public get senha(): string {
    return this._senha;
  }
  public set senha(value: string) {
    this._senha = value;
  }
  public get cnpj(): string {
    return this._cnpj;
  }
  public set cnpj(value: string) {
    this._cnpj = value;
  }
  public get cpf(): string {
    return this._cpf;
  }
  public set cpf(value: string) {
    this._cpf = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }
}
