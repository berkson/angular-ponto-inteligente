export class Lancamento {
  constructor(
    private _data: string,
    private _tipo: string,
    private _localizacao: string,
    private _funcionarioId: string,
    private _id?: string | undefined
  ) {}
  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
  public get funcionarioId(): string {
    return this._funcionarioId;
  }
  public set funcionarioId(value: string) {
    this._funcionarioId = value;
  }
  public get localizacao(): string {
    return this._localizacao;
  }
  public set localizacao(value: string) {
    this._localizacao = value;
  }
  public get tipo(): string {
    return this._tipo;
  }
  public set tipo(value: string) {
    this._tipo = value;
  }
  public get data(): string {
    return this._data;
  }
  public set data(value: string) {
    this._data = value;
  }
}
