export class CadastroPj {
  constructor(
    private _nome: string,
    private _email: string,
    private _senha: string,
    private _cpf: string,
    private _razaoSocial: string,
    private _cnpj: string
  ) {}

  public get nome(): string {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

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
  public get razaoSocial(): string {
    return this._razaoSocial;
  }
  public set razaoSocial(value: string) {
    this._razaoSocial = value;
  }
  public get cpf(): string {
    return this._cpf;
  }
  public set cpf(value: string) {
    this._cpf = value;
  }
}
